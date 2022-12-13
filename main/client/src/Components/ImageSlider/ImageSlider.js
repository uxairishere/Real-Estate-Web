import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Box } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function Item(item) {
    return (
        <>
            <Paper sx={{ position: 'relative' }}>
                <Box sx={{ height: 500 }}>
                    <img src={`/images/${item.image}`} alt="" style={{ height: '100%', width: '100%', zIndex: -1 }} />
                </Box>
            </Paper>

        </>
    )
}



const ImageSlider = ({images}) => {
    const pictures = JSON.parse(images)


    return (
        <Carousel
            sx={{ height: '400px' }}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosNewIcon />}
            navButtonsWrapperProps=
            {{
                style: {
                    bottom: '0',
                    top: 'unset'
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '-150px',

                }
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',
                    zIndex: 1
                }
            }}
        >
            {
                pictures.map((item, i) => (
                    <div key={i}>
                        < Item image={item} />
                    </div>
                ))
            }
        </Carousel >
    )
}



export default ImageSlider