import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Grid, TextField, FormControl, Box, FormControlLabel, Radio, RadioGroup, InputAdornment, Autocomplete, Paper, stepConnectorClasses} from '@mui/material'
import NumberFormat from "react-number-format";
import { createPurchase } from '../features/purchases/purchaseSlice' 
import { toast } from 'react-toastify';

export const numberFormat = value =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

 const PurchaseForm = () => {

    const [title, setTitle] = useState("");
    const [producer, setProducer] = useState("");
    const [director, setDirector] = useState("");
    const [platform, setPlatform] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [length, setLength] = useState("");
    const [customLength, setCustomLength] = useState("")
    const [customRange, setCustomRange] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [requesterName, setRequesterName] = useState("");
    const [requesterEmail, setRequesterEmail] = useState("");
    const [requesterDepartment, setRequesterDepartment] = useState("");
    const [notes, setNotes] = useState("");

    const toggle = () => {
        setCustomRange(!customRange);
    }

    const reset = () => {
        customRange && toggle();
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {

        e.preventDefault()

        let submittedLength = ""

        if (length === "customRange") {
            submittedLength = customLength;
        } else {
            submittedLength = length
        }

        console.log(submittedLength)
     
        dispatch(createPurchase({title, producer, director, platform, year, price, length: submittedLength, startDate, endDate, requesterName, requesterEmail, requesterDepartment, notes}))
        // setTitle('')
        // setProducer('')
        // setDirector('')
        // setPlatform('')
        // setPrice('')
        // setLength('')
        // setRequesterName('')
        // setRequesterEmail('')
        // setRequesterDepartment('')
        // setNotes('')

        toast.success("You have successfully added a new license to your database.")
        navigate("/table")
    }

    return (
        <form onSubmit={onSubmit} className="purchaseForm">
        <Box>
            <Paper elevation={3} sx={{p:2, pb: 1}}>
            <Grid container sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-between', my:2}}>
                <Grid item sx={{flexGrow: '1', textAlign: 'left'}}><h3>Title:</h3></Grid>
                <TextField sx={{flexGrow: '11'}} item id="title" label="Title" type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>        
            </Grid>
            
            <Grid container row sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent:'space-between', my: 2}}>      
                <TextField item xs={4} sm={4} md={4} lg={4} xl={4} id="producer" label="Production Company" type="text" value={producer} onChange={(e) => setProducer(e.target.value)}/> 
                <TextField item xs={4} sm={4} md={4} lg={4} xl={4} id="director" label="Director" type='text' value={director} onChange={(e) => setDirector(e.target.value)}/>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}> 
                    <Autocomplete id="platform" options={platforms} value={platform} onChange={(e, value) => setPlatform(value)} renderInput={(params) => <TextField {...params} label="Platform"/>}/>
                </Grid>
            </Grid>

            <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent:'space-evenly', my: 2}}>        
                <TextField item id="year" label="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)}/>
                <FormControl item variant='outlined'>
                    <NumberFormat customInput={TextField} prefix="$" thousandSeparator={true} decimalSeperator="." fixedDecimalScale={true} decimalScale={2} id="price" label="Price" placeholder="Price" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}} value={price} onChange={(e) => setPrice(e.target.value)}/>
                </FormControl>
            </Grid>
            
            <Grid container sx={{flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', my:2}}>
                <Grid item id="radioId"sx={{flexGrow: '4', textAlign: 'left'}}><h3>Length of License:</h3></Grid>
                <RadioGroup item sx={{flexGrow: '8'}} row aria-labelledby="demo-row-radio-buttons-group-label" defaultValue="1 year" name="licenseRadio" value={length} onChange={(e) => setLength(e.target.value)}>
                    <FormControlLabel default value="1 year" control={<Radio />} label="1 Year" onChange={reset}/>
                    <FormControlLabel value="3 years" control={<Radio />} label="3 Year" onChange={reset}/>
                    <FormControlLabel value="5 years" control={<Radio />} label="5 Year" onChange={reset}/>
                    <FormControlLabel value="perpetual" control={<Radio />} label="Perpetual" onChange={reset}/>
                    <FormControlLabel value="customRange" control={<Radio />} label="Custom Length" onChange={toggle}/>
                </RadioGroup>
            </Grid>

            <Grid>
                    <TextField id='customRange' label="Custom Range" type="text" value={customLength} onChange={(e) => setCustomLength(e.target.value)} {...(!customRange && {disabled: true})} {...(!customRange && {helperText: "Click Custom Length to to enable this"})} />
            </Grid>

            <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', margin:'10px auto'}}>     
                <Grid item id="radioId"><h3>License Start and End Dates</h3></Grid>
                <Grid item id="radioId"><h3>Start Date:</h3></Grid>
                <TextField item id="licenseStart" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <Grid item id="radioId"><h3>End Date:</h3></Grid>
                <TextField item id="licenseEnd" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>   
            </Grid>
            
            <Box sx={{border: 1, borderRadius: 1, borderColor: 'grey.500', px: 2, pb: 2, mb: '10px'}}>
                <h4>Faculty or Staff Member Who Requested the Film</h4>
                <Grid container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>              
                    <TextField item xs={4} sm={4} md={4} lg={4} xl={4} id="requesterName" label="Name" type="text" value={requesterName} onChange={(e) => setRequesterName(e.target.value)}/>    
                    <TextField item xs={4} sm={4} md={4} lg={4} xl={4} id="requesterEmail" label="Email" type="email" value={requesterEmail} onChange={(e) => setRequesterEmail(e.target.value)}/>    
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}> 
                        <Autocomplete id="requesterDepartment" options={departments} value={requesterDepartment} onChange={(e, value) => setRequesterDepartment(value)} renderInput={(params) => <TextField {...params} label="Department" />}/>
                    </Grid>   
                </Grid>
            </Box>

            <Grid container sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-between', my:2}}>
                <Grid item id="outlined-search" label="Search field" type="search" sx={{flexGrow: '1'}}><h3>Any Comments or Notes?</h3></Grid>    
                <TextField item id="notes" label="Comments/Notes" type="text" multiline maxRows={3} sx={{flexGrow: '5'}} value={notes} onChange={(e) => setNotes(e.target.value)}/>       
            </Grid>    
            
                <div className="form-group">
                        <button className='btn btn-block' type='submit'>
                            Add Purchase
                        </button>
                </div>
        </Paper>
        </Box>
        </form>
  )
}

const platforms = ['Kanopy', 'Swank', 'Films on Demand', 'Direct from Distributor', 'Netflix', 'Hulu', 'Amazon Prime Video', 'Disney+', 'Paramount+', 'Self-hosted', 'Other (Please Specify in the Notes Below)'];

const departments = ['Art','Biology','Chemisty','Engineering','English' ,'History','Physics','Psychology'];

export default PurchaseForm