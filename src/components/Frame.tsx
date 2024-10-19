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
    Paper,
    ThemeProvider,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@mui/material";
import {ReactNode, useState} from "react";
import {title} from "@/values";
import {AccountCircle, Close, Home} from "@mui/icons-material";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Swr from "@/components/Swr";
import {z} from "zod";

const theme = createTheme({
    colorSchemes: {
        dark: true
    }
})

const schema = z.object({
    master: z.boolean()
}).strict()

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
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={() => push('/')}
                        >
                            <Home/>
                        </IconButton>}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {name ?? '首页'}
                    </Typography>
                    {status === 'loading' ?
                        <CircularProgress color="inherit"/> :
                        <IconButton
                            size="large"
                            onClick={handleAuth}
                            color="inherit"
                        >
                            {data ?
                                <Avatar
                                    alt={data.user?.name ?? undefined}
                                    src={data.user?.image ?? undefined}
                                    sx={{width: 24, height: 24}}
                                /> :
                                <AccountCircle/>}
                        </IconButton>}
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
                                <Swr url="/api/auth" value={schema}>
                                    {({master}) =>
                                        <Paper elevation={master ? 3 : 0}>
                                            123
                                        </Paper>}
                                </Swr>
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