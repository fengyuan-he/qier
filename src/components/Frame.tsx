import {
    AppBar,
    Avatar,
    Box,
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
    Fab,
    Fade,
    IconButton,
    Slide,
    ThemeProvider,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@mui/material";
import {ReactNode, useState} from "react";
import {title} from "@/values";
import {AccountCircle, Close, Error, Home, KeyboardArrowUp} from "@mui/icons-material";
import {signIn, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useUser} from "@/components/UserProvider";
import Report from "@/components/Report";
import {blue, lightGreen} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: lightGreen,
    },
    colorSchemes: {
        dark: true
    }
})

function ScrollTop({children}: {
    children: ReactNode
}) {
    const trigger = useScrollTrigger({disableHysteresis: true, threshold: 100})
    const {push} = useRouter()
    return (
        <Fade in={trigger}>
            <Box
                onClick={() => push('#顶部')}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    )
}

export default function Frame({name, children}: {
    name?: string
    children?: ReactNode
}) {
    const trigger = useScrollTrigger()
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
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Toolbar>
                        {name !== undefined &&
                            <IconButton
                                size="large"
                                color="inherit"
                                sx={{mr: 2}}
                                onClick={() => push('/')}
                                aria-label="回到首页"
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
                                aria-label="用户"
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
                                    onClick={handleClose}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: theme.palette.grey[500],
                                    })}
                                    aria-label="关闭"
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
            </Slide>
            <Toolbar id="顶部"/>
            <Container>
                {children}
            </Container>
            <ScrollTop>
                <Fab size="small" aria-label="回到顶部">
                    <KeyboardArrowUp/>
                </Fab>
            </ScrollTop>
        </ThemeProvider>
    )
}