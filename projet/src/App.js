import "./App.css";
import Stack from "@mui/material/Stack";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Avatar from "@mui/material/Avatar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { data } from "./context";
// const axios = require('axios/dist/node/axios.cjs'); // node
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
} 
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
 function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [creat, setcreat] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let {tach}=React.useContext(data)
  let  tache=tach.map((e,i)=>{
    return(<li key={i} style={{listStyle:"none"}}> <Tache titel={e}/> </li>);
  })
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">;
          <Tab label="Item One" {...a11yProps(0)}sx={{ width: '30%',color:"white",border:"1px solid",borderRadius:"5PX" }} />
          <Tab label="Item Two" {...a11yProps(1)} sx={{ width: '40%',color:"white" ,border:"1px  solid",borderRadius:"5PX" }}/>
          <Tab label="Item Three" {...a11yProps(2)} sx={{ width: '30%',color:"white",border:"1px  solid",borderRadius:"5PX"  }}/>
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0}>
        <ul style={{padding:"0px"}}>{tache}</ul>
        <Stack direction="row" sx={{ justifyContent: "space-between",mt:"12px", alignItems:"center"}}>
             <CreatTache valid={creat}/>
            <Fab color="primary" size="small" aria-label="add" onClick={e=>{
             if(creat){
              setcreat(false);
              console.log(creat);
              
             }else{
              setcreat(true);
              console.log(creat);
             }
            }} >
              <AddIcon />
            </Fab>
          </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <ul style={{padding:"0px"}}>{tache}</ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
function App() {
    let [tach, setTache] =React.useState(["day","day2","day3"])
     const addDay = (day) => {
    setTache(prev => [...prev,day]);
  };
  return (
    <data.Provider value={{tach,addDay}}>
    <div className="App">
      <header className="App-header">
        <BasicButtons />
        
      </header>
    </div>
    </data.Provider>
  );
}
function BasicButtons() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#000000", p: "10px", borderRadius: "20px" }}>
          <header
            style={{
              background: "black",
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
            }}
          >
            todo list
          </header>
            <BasicTabs />  
        </Box>
      </Container>
    </React.Fragment>
  );
}
function Tache({titel}){
  return( 
  <Box sx={{ m: "7px", gap: "5px" }}>
            <Stack
              direction="row"
              sx={{
                mb: "4px",
                cursor: "pointer",
                background: "#071116",
                borderRadius: "10px",
                p: "10PX",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar>Tch</Avatar>
              <div>{titel}</div>
              <Stack direction="row" spacing={2}>
                <Fab color="secondary" size="small" aria-label="add" onClick={TacheValid}>
                  <CheckCircleOutlineIcon />
                </Fab>
                <Fab color="error" size="small" aria-label="add">
                  <DeleteForeverIcon />
                </Fab>
                <Fab color="primary" size="small" aria-label="add">
                  <EditIcon />
                </Fab>
              </Stack>
            </Stack>
          </Box>
          );
}
function CreatTache({ valid }) {
  const { addDay } = React.useContext(data);
  const [value, setValue] = React.useState("");

  if (!valid) return null;

  return (
    <Stack direction="row" sx={{ background:"#1a3133", color:"wheat", borderRadius:"20px" }}>
      <Button
        sx={{ mr:"10px" }}
        variant="text"
        size="small"
        onClick={() => {
          if (value.trim() !== "") {
            addDay(value);
            localStorage.setItem("post",[...value,value])
            setValue("");
            valid=false
          }
        }}
      >
        CREAT
      </Button>

      <TextField
        label="enter la tache"
        variant="filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ borderLeft:"1px solid" }}
      />
    </Stack>
  );
}
function TacheValid({titel,key}){
  return( 
  <Box sx={{ m: "7px", gap: "5px" }}>
            <Stack
              direction="row"
              sx={{
                mb: "4px",
                cursor: "pointer",
                background: "#071116",
                borderRadius: "10px",
                p: "10PX",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar>{key}</Avatar>
              <div>{titel}</div>
              <Stack direction="row" spacing={2}>
                <Fab color="secondary" size="small" aria-label="add">
                  <CheckCircleOutlineIcon />
                </Fab>
                <Fab color="error" size="small" aria-label="add">
                  <DeleteForeverIcon />
                </Fab>
                <Fab color="primary" size="small" aria-label="add">
                  <EditIcon />
                </Fab>
              </Stack>
            </Stack>
             </Box>);
}




export default App;
