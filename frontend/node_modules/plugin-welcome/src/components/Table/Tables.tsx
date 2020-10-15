import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DefaultApi } from '../../api/apis';

import { EntRecordfood } from '../../api/models/EntRecordfood';
import { EntFOODMENU } from '../../api/models/EntFOODMENU';
 
const useStyles = makeStyles({
 table: {
   minWidth: 650,
 },
});
 
export default function ComponentsTable() {
 const classes = useStyles();
 const api = new DefaultApi();
 const [users, setUsers] = useState(Array);
 const [loading, setLoading] = useState(true);

 const [recordfoods, setRecordfoods] = useState<EntRecordfood[]>([]);
 
 useEffect(() => {
   const getRecordfoods = async () => {
     const res = await api.listRecordfood({ limit: 10, offset: 0 });
     setLoading(false);
     setRecordfoods(res);
   };
   getRecordfoods();
 }, [loading]);
 
 const deleteRecordfoods = async (id: number) => {
   const res = await api.deleteRecordfood({ id: id });
   setLoading(true);
 };
 
 return (
   <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell align="center">Record ID </TableCell>
           <TableCell align="center">User Name</TableCell>
           <TableCell align="center">ชื่ออาหาร</TableCell>
           <TableCell align="center">วัตถุดิหลัก</TableCell>
           <TableCell align="center">แหล่งที่มา</TableCell>
           <TableCell align="center">ที่อยู่</TableCell>
           <TableCell align="center">เบอร์โทร</TableCell>
           </TableRow>
       </TableHead>
       <TableBody>
         {recordfoods.map((item:any) => (
           <TableRow key={item.id}>
             <TableCell align="center">{item.id}</TableCell>
             <TableCell align="center">{item.edges.recorduser.uSERNAME}</TableCell>
             <TableCell align="center">{item.edges.recordfoodmenu.fOODMENUNAME}</TableCell>
             <TableCell align="center">{item.edges.recordingredient.mAININGREDIENTNAME}</TableCell>
             <TableCell align="center">{item.edges.recordsource.sOURCENAME}</TableCell>
             <TableCell align="center">{item.edges.recordsource.sOURCEADDRESS}</TableCell>
             <TableCell align="center">{item.edges.recordsource.sOURCETLE}</TableCell>
             <TableCell align="center">
               <Button
                 onClick={() => {
                  deleteRecordfoods(item.id);
                 }}
                 style={{ marginLeft: 10 }}
                 variant="contained"
                 color="secondary"
               >
                 Delete
               </Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}
