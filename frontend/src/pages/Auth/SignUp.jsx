import React, { useContext } from 'react';
import { UserContext } from '../../helper/UserContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUpRequest } from '../../helper/api';
import { useHistory } from 'react-router-dom';
import AuthInput from './AuthInput';
import { Controller, useForm } from 'react-hook-form';

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
  const classes = useStyles();
  const history = useHistory();
  const { control, handleSubmit, watch } = useForm()

  async function signUp (e) {
    const [name, email, password] = [watch('name'), watch('email'), watch('password')]
    console.log(name, email, password)
    const data = await signUpRequest(email, password, name)
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('email', email)
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
                <form className={classes.form} noValidate onSubmit={handleSubmit(signUp)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({
                                  field,
                                  fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                  error && error.type === 'required'
                                    ? <AuthInput label='昵称' errorText={'昵称不能为空'} field={field}/>
                                    : <AuthInput label='昵称' field={field}/>
                                )}

                                rules={{ required: true }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({
                                  field,
                                  fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                  error && error.type === 'required'
                                    ? <AuthInput label='邮箱地址' errorText={'邮箱不能为空'} field={field}/>
                                    : error && error.type === 'pattern'
                                      ? <AuthInput label='邮箱地址' errorText={'邮箱格式错误'} field={field}/>
                                      : <AuthInput label='邮箱地址' field={field}/>
                                )}

                                rules={{
                                  required: true,
                                  pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Controller
                                name="password"
                                control={control}
                                render={({
                                  field,
                                  fieldState: { invalid, isTouched, isDirty, error },
                                }) => (
                                  error && error.type === 'required'
                                    ? <AuthInput label='密码' errorText={'密码不能为空'} field={field}/>
                                    : <AuthInput label='密码' field={field}/>
                                )}

                                rules={{ required: true }}
                            />
                        </Grid>
                    </Grid >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
