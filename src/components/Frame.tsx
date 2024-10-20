import {
    AppBar,
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@mui/material";
import {ReactNode, useState} from "react";
import {title} from "@/values";
import {AccountCircle, Close, Error, Home} from "@mui/icons-material";
import {signIn, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useUser} from "@/components/UserProvider";
import Report from "@/components/Report";

const theme = createTheme({
    colorSchemes: {
        dark: true
    }
})

export default function Frame({name, children}: {
    name?: string
    children?: ReactNode
}) {
    const trigger = useScrollTrigger({disableHysteresis: true, threshold: 0})
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const {data, error, mutate, isLoading} = useUser()
    const handleAuth = () => data || error ? setOpen(true) : signIn('github')
    const {push} = useRouter()
    return (
        <ThemeProvider theme={theme}>
            <title>{name === undefined ? title : `${name}|${title}`}</title>
            <CssBaseline/>
            <AppBar elevation={trigger ? 4 : 0}>
                <Toolbar>
                    {name !== undefined &&
                        <IconButton
                            size="large"
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={() => push('/')}
                        >
                            <Home/>
                        </IconButton>}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {name ?? '首页'}
                    </Typography>
                    {isLoading ?
                        <CircularProgress color="inherit"/> :
                        <IconButton
                            size="large"
                            onClick={handleAuth}
                            color="inherit"
                        >
                            {error ?
                                <Error/> :
                                data ?
                                    <Avatar
                                        alt={data.name}
                                        src={data.image}
                                        sx={{width: 24, height: 24}}
                                    /> :
                                    <AccountCircle/>}
                        </IconButton>}
                    {(data || error) &&
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{m: 0, p: 2}}>
                                {data ?
                                    <>
                                        {data.name}
                                        {data.master && <Chip label="站长" sx={{ml: 1}} size="small"/>}
                                    </> :
                                    '登录失败'}
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={(theme) => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: theme.palette.grey[500],
                                })}
                            >
                                <Close/>
                            </IconButton>
                            <DialogContent>
                                {data ?
                                    <></> :
                                    <Report error={error} onRetry={mutate}/>}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => signOut()}>
                                    登出
                                </Button>
                            </DialogActions>
                        </Dialog>}
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Container>
                {children}
            </Container>
        </ThemeProvider>
    )
}