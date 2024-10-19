import {
    AppBar,
    Avatar,
    Button,
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
import {home, title} from "@/values";
import {AccountCircle, Close, Home} from "@mui/icons-material";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

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
    const {data, status} = useSession()
    const handleAuth = () => {
        if (data) setOpen(true)
        else signIn('github')
    }
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
                        edge="start"
                        color="inherit"
                        sx={{mr: 2}}
                        onClick={() => push('/')}
                    >
                        <Home/>
                    </IconButton>}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {name ?? home}
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={handleAuth}
                        disabled={status === 'loading'}
                        color="inherit"
                    >
                        {status === 'loading' ?
                            <CircularProgress/> :
                            data ?
                                <Avatar alt={data.user?.name ?? undefined} src={data.user?.image ?? undefined}/> :
                                <AccountCircle/>}
                    </IconButton>
                    {data &&
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{m: 0, p: 2}}>
                                {data.user?.name ?? undefined}
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