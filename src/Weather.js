import {Box, makeStyles} from '@material-ui/core'
import logo from './bg_banner.jpg'
import Form from './Form';

const useStyles = makeStyles({
    component:{
        height :'100vh',
        display:'flex',
        alignItems : 'center',
        width : '65%',
        margin : '0 auto',

        
    },
    leftContainer :{

        backgroundImage: `url(${logo})`,
        height : '80%',
        width : '30%',
        backgroundSize : 'cover',
        borderRadius : '20px 0px 0px 20px'
        

    },
    rightContainer:{
        background :'linear-gradient(to right , #e74c3c , #e67e22)',
        height:'80%',
        width : '70%'
    }
})

const Weather = () =>{
    const clases = useStyles();
    return(
        <Box className={clases.component}>
            <Box className={clases.leftContainer}>

            </Box>
            <Box className = {clases.rightContainer}>
                <Form></Form>
            </Box>
            
        </Box>
    )
}

export default Weather;
