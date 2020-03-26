import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../styles/registration.css';
import FormHelperText from '@material-ui/core/FormHelperText'; //maybe to give tips on password

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: '',
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      termsConditions: false,
      showPassword: false
    };
  }

  handleChange = (evt) => {
    console.log(this.state);
    console.log('event', evt);
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleTandC = () => {
    this.setState({ termsConditions: !this.state.termsConditions });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    const {
      img,
      username,
      password,
      showPassword,
      email,
      firstName,
      lastName,
      country,
      termsConditions
    } = this.state;
    return (
      <div className={classes.root}>
        <div className='Form-avatar'>
          <p>Add Photo</p>
        </div>
        <div className='Form-mui-parent'>
          <div>
            <FormControl fullWidth className={classes.margin} variant='outlined'>
              <InputLabel htmlFor='register-username'>Username</InputLabel>
              <OutlinedInput
                id='register-username'
                name='username'
                value={username}
                onChange={this.handleChange}
                placeholder='billtravel97'
                labelWidth={75}
              />
            </FormControl>
            <FormControl fullWidth className={clsx(classes.margin)} variant='outlined'>
              <InputLabel htmlFor='register-password'>Password</InputLabel>
              <OutlinedInput
                id='register-password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge='end'
                      id='show-password'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText>Minimum 6 characters</FormHelperText>
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant='outlined'>
              <InputLabel htmlFor='register-email'>E-mail</InputLabel>
              <OutlinedInput
                id='register-email'
                name='email'
                value={email}
                onChange={this.handleChange}
                splaceholder='billjohnson@email.com'
                labelWidth={45}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant='outlined'>
              <InputLabel htmlFor='register-firstName'>First Name</InputLabel>
              <OutlinedInput
                id='register-firstName'
                name='firstName'
                value={firstName}
                onChange={this.handleChange}
                placeholder='William'
                labelWidth={80}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant='outlined'>
              <InputLabel htmlFor='register-lastName'>Last Name</InputLabel>
              <OutlinedInput
                id='register-lastName'
                name='lastName'
                value={lastName}
                onChange={this.handleChange}
                placeholder='Johnson'
                labelWidth={80}
              />
            </FormControl>
            <FormControl fullWidth variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={country}
                onChange={this.handleChange}
                name='country'
                labelWidth={55}
                endAdornment={
                  <InputAdornment position='end'>
                    <ArrowDropDownIcon
                      aria-label='drop down menu'
                      onMouseDown={this.handleMouseDownPassword}
                      edge='end'
                      id='dropdown'></ArrowDropDownIcon>
                  </InputAdornment>
                }>
                <MenuItem value=''>
                  <em>Choose</em>
                </MenuItem>
                <MenuItem value='AU'>Australia</MenuItem>
                <MenuItem value='BR'>Brazil</MenuItem>
                <MenuItem value='NL'>Netherlands</MenuItem>
                <MenuItem value='PE'>Peru</MenuItem>
                <MenuItem value='NL'>Scotland</MenuItem>
                <MenuItem value='ES'>Spain</MenuItem>
                <MenuItem value='SW'>Sweden</MenuItem>
                <MenuItem value='UK'>United Kingdom</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              id='checkbox'
              control={
                <Checkbox onClick={this.handleTandC} value='termsConditions' color='primary' />
              }
              label='I agree to the terms and conditions of MYtinerary.'
            />
            <FormControl fullWidth className={classes.formControl}>
              <Button
                disabled={!this.state.termsConditions}
                onClick={this.handleSubmit}
                name='submit'
                id='submit-button'
                className={this.state.termsConditions ? 'active' : null}>
                Sign Up
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterForm);
