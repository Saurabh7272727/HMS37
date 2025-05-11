import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Header = ({ login, userData }) => {
    const navi = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const token = Cookies.get('userToken');
    const handleClose = async (e) => {
        if (e === 'logout') {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/logout`, {
                method: 'POST',
                headers: { "Authorization": "bearer " + `${token}` },
            })
            const result = await response.json();
            const { success, message } = result;
            if (success) {
                Cookies.remove('userToken');
                setTimeout(() => window.location.reload(), 2400);
                toast.success(message);
            } else {
                toast.error('something was wrong with you');
            }
        }

        if (e === 'profile') {
            navi('/profile');
        }
        if (e === 'list') {
            navi('/list');
        }
        setAnchorEl(null);
    };

    return (
        <>
            <header className="bg-translate py-4 sticky top-0 z-10 md:w-screen bg-white">
                <nav className="w-[70%] sm:w-[70%] hover:bg-white md:w-[70%] bg-gradient-to-br from-sky-600 to-sky-600 mx-auto px-9 flex justify-between items-center  rounded-lg ">
                    <ul className="flex space-x-5">
                        <li className="relative group">
                            <img src='/vite.svg'
                                href="#"
                                className="w-[50px] min-w-[50px] min-h-9 h-9 cursor-pointer object-contain"
                                onClick={() => navi('/')}
                            />
                        </li>
                        <li className="relative group">
                            <a href="#" className="text-white group-hover:opacity-50 text-lg px-3 py-2 rounded transition-all duration-300 hover:bg-gray-600">
                                Informations about
                            </a>
                            <ul className="absolute hidden group-hover:block group-hover:visible translate-y-[-30px] bg-gray-600 rounded shadow-lg mt-2 w-48 z-20">
                                <li onClick={() => navi('devLever')}><a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Dev Lever</a></li>
                                <li onClick={() => navi('/admin')}><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Admin</a></li>
                                <li onClick={() => navi('/FindDoctorPage')}><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Find Doctor</a></li>
                            </ul>
                        </li>
                        <li className="relative group">
                            <a href="#" className="text-white text-lg px-3 py-2 rounded transition-all duration-300 hover:bg-gray-600">
                                Services
                            </a>
                            <ul className="absolute hidden group-hover:block group-hover:translate-y-[-30px] bg-gray-600 rounded shadow-lg mt-2 w-48 z-20">
                                <li onClick={() => navi('/studycase')}><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Study Case</a></li>
                                <li onClick={() => navi('/list')}><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">List</a></li>
                                <li onClick={() => navi('/LocationPage')}><a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Locations</a></li>
                            </ul>
                        </li>
                        <li className="relative group">
                            <a href="#" className="text-white text-lg px-3 py-2  rounded transition-all duration-300 hover:bg-gray-600">
                                Reservations
                            </a>
                            <ul className="absolute hidden group-hover:block group-hover:translate-y-[-30px] bg-gray-600 rounded shadow-lg mt-2 w-48 z-20">
                                <li><a href="#" onClick={() => navi('/profile')} className="block px-4 py-2 text-white hover:bg-gray-700">Check status</a></li>
                                <li><a href="#" onClick={() => navi('/appointment')} className="block px-4 py-2 text-white hover:bg-gray-700">New Appointment</a></li>
                                <li><a href="#" onClick={() => navi('/printf')} className="block px-2 py-2 text-white hover:bg-gray-700">print conformation letter</a></li>
                            </ul>
                        </li>
                    </ul>
                    {
                        userData?.success ? (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Typography
                                        sx={{
                                            minWidth: 100,
                                            fontSize: 18,
                                            color: 'white',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => navi('/contact')}
                                        className="min-w-[100px] text-lg text-white font-medium cursor-pointer"
                                    >
                                        Contact
                                    </Typography>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}>{userData?.data?.fullname?.charAt(0).toUpperCase()}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => handleClose('profile')}>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => handleClose('list')}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Add another account
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={(e) => handleClose('logout')}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        ) : (
                            <button
                                onClick={() => navi('/auth/signup')}
                                className="w-24 bg-white text-slate-600 h-8 text-base font-medium border-none rounded transition-all duration-300 hover:bg-gray-600 hover:text-white active:scale-100"
                            >
                                SignUp
                            </button>
                        )
                    }
                </nav>
            </header>
            <ToastContainer position='bottom-center' />
        </>
    );
};

export default Header;