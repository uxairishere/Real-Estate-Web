import { Typography, Box, Container, Button, Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Text = styled(Typography)(() => ({
    fontSize: "16px",
    fontWeight: 500,
}));

export const Heading = styled(Typography)(() => ({
    fontSize: "28px",
    fontWeight: 800,
}));

export const SubHeading = styled(Typography)(() => ({
    fontSize: "18px",
    fontWeight: 600,
}));

export const StyledBox = styled(Box)(() => ({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundBlendMode: 'saturation',
    width: '100%',
    height: '100vh',
}));

export const StyledContainer = styled(Container)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
}));

export const StyledButton = styled(Button)(() => ({
    margin: 40,
    height: 80,
    width: 200,
    color: 'white',
    border: '4px solid white',
}));

export const StyledCheckBox = styled(Checkbox)(() => ({
    position: 'relative',
    left: 200
}));