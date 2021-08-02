import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Redirect } from 'react-router-dom';
import { signInRequest } from '../helper/api';
import { UserContext } from '../helper/UserContext';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn () {
  const [email, editEmail] = useState('')
  const [password, editPassword] = useState('')
  const { setHaveToken } = useContext(UserContext)
  const classes = useStyles();
  // const query = useLocation().search
  const history = useHistory();
  function signIn (e) {
    e.preventDefault()
    signInRequest(email, password)
      .then(data => {
        console.log(data.token)
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('email', email)
        setHaveToken(true)
        history.push('/home');
      })
      .catch(e => { alert(e) })

    return false
  }

  return (sessionStorage.getItem('token')
    ? <Redirect to={'/home'}/>
    : <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={signIn} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            id="email"
                            label="邮箱地址"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => {
                              editEmail(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={password}
                            required
                            fullWidth
                            name="password"
                            label="密码"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            onChange={(e) => {
                              editPassword(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="记住我"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            name='SignIn'
                            // onClick={() => { signIn() }}
                        >
                            登录
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='/SignUp' variant="body2">
                                    {'还没有自己的账户? 点此注册'}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
  )
}
