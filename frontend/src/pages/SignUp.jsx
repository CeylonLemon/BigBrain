import React, { useRef, useContext } from 'react';
import { UserContext } from '../helper/UserContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUpRequest } from '../helper/api';
import { useHistory } from 'react-router-dom';

function Copyright () {
  return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                BigBrain
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp () {
  const { setHaveToken } = useContext(UserContext);
  const formRef = useRef()
  const classes = useStyles();
  const history = useHistory();

  async function signUp (e) {
    e.preventDefault()
    const inputs = Array.from(formRef.current.getElementsByTagName('input'))
    const [name, email, password] = inputs.map(input => { return input.value })
    const data = await signUpRequest(name, email, password)
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('email', data.email)
    setHaveToken(true)
    history.push('/home');
  }

  return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    注册
                </Typography>
                <form className={classes.form} noValidate ref={formRef} onSubmit={signUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="昵称"
                                autoFocus

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="邮箱地址"
                                name="email"
                                autoComplete="email"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="current-password"

                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={() => signIn()}
                    >
                        注册
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Link href='/SignIn' variant="body2">
                                已有账户? 点此登录
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
  );
}
