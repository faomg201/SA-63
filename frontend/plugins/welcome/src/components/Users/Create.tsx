import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
} from '@backstage/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DefaultApi } from '../../api/apis';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Alert } from '@material-ui/lab';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import { EntFOODMENU } from '../../api/models/EntFOODMENU';
import { EntMainingre } from '../../api/models/EntMainingre';
import { EntSource } from '../../api/models/EntSource';
import { EntRecordfood } from '../../api/models/EntRecordfood';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
);


const initialUserState = {
  name: 'Makawan Thojan',
  n: 10,
  
};

export default function Create() {
  const classes = useStyles();
  const profile = { givenName: 'บันทึกแหล่งที่มาของอาหาร' };
  const username = { givenuser: 'faomg201@gmail.com' };
  const logout = { givenlogout: 'logout' };
  const api = new DefaultApi();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(initialUserState);
  const [foodmenus, setFOODMENU] = useState<EntFOODMENU[]>([]);
  const [mainingres, setMainingre] = useState<EntMainingre[]>([]);
  const [sources, setSource] = useState<EntSource[]>([]);
  const [recordfoods, setRec] = useState<EntRecordfood[]>([]);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);

  const [foodmenuid, setFOODMENUID] = useState(Number);
  const [mainingreid, setMainingreID] = useState(Number);
  const [sourceid, setSourceID] = useState(Number);

  useEffect(() => {    
    const getFOODMENU = async () => {
      const res = await api.listFoodmenu({ limit: 10, offset: 0 });
      setLoading(false);
      setFOODMENU(res);
    };
    getFOODMENU();

    const getMainingre = async () => {
      const res = await api.listMainingre({ limit: 10, offset: 0 });
      setLoading(false);
      setMainingre(res);
    };
    getMainingre();

    const getSource = async () => {
      const res = await api.listSource({ limit: 10, offset: 0 });
      setLoading(false);
      setSource(res);
    };
    getSource();


  }, [loading]);

  const FOODMENUhandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFOODMENUID(event.target.value as number);
  };

  const MainingrehandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMainingreID(event.target.value as number);
  };

  const SourcehandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSourceID(event.target.value as number);
  };

  const CreateRecordfood = async () => {
    const recordfood = {
      recordFOODMENU: foodmenuid,
      recordINGREDIENT: mainingreid,
      recordSOURCE: sourceid,
      recordUSER: 2
    };
    
    console.log(recordfood);
    const res: any = await api.createRecordfood({ recordfood: recordfood });
    setStatus(true);
    if (res.id != '') {
      setAlert(true);
    } else {
      setAlert(false);
    }
    const timer = setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  return (
    <Page theme={pageTheme.home}>
      <Header
        title={` ${profile.givenName || 'to Backstage'}`}
        subtitle=""
      ></Header>
      <Content>
      <ContentHeader  title="เพิ่มข้อมูลแหล่งที่มาของอาหาร">
      <Typography align="left" style={{ marginRight: 16, color: "#00eeff" }}>
            {username.givenuser}
          </Typography>
          <Button variant="contained" color="primary">
              ออกจากระบบ
          </Button>
          {status ? (
            <div>
              {alert ? (
                <Alert severity="success">
                  บันทึกสำเร็จ
                </Alert>
              ) : (
                  <Alert severity="warning" style={{ marginTop: 20 }}>
                    พบปัญหาระหว่างบันทึกข้อมูล
                  </Alert>
                )}
            </div>
          ) : null}
        </ContentHeader>
     
        <div className={classes.root}>
          <form noValidate autoComplete="off">
          <FormControl
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel id="foodmenu-label">ชื่ออาหาร</InputLabel>
                <Select
                  labelId="foodmenu-label"
                  id="foodmenu"
                  value={foodmenuid}
                  onChange={FOODMENUhandleChange}
                  style={{ width: 400 }}
                >
                {foodmenus.map((item: EntFOODMENU) => (
                  <MenuItem value={item.id}>{item.fOODMENUNAME}</MenuItem>
                ))}
                </Select>
              </FormControl>

            <div>
              <FormControl
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel id="Mainingre-label">ชื่อวัตถุดิบหลักก</InputLabel>
                <Select
                  labelId="Mainingre-label"
                  id="mainingre"
                  value={mainingreid}
                  onChange={MainingrehandleChange}
                  style={{ width: 400 }}
                >
                {mainingres.map((item: EntMainingre) => (
                  <MenuItem value={item.id}>{item.mAININGREDIENTNAME}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </div>

            <FormControl
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel id="Source-label">ชื่อร้านอาหาร</InputLabel>
              <Select
                labelId="Source-label"
                id="source"
                value={sourceid}
                onChange={SourcehandleChange}
                style={{ width: 200 }}
              >
                {sources.map((item: EntSource) => (
                  <MenuItem value={item.id}>{item.sOURCENAME}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.margin}>
              <Button
                onClick={() => {
                  CreateRecordfood();
                }}
                variant="contained"
                color="primary"
              >
                ยืนยัน
             </Button>
              <Button
                style={{ marginLeft: 20 }}
                component={RouterLink}
                to="/"
                variant="contained"
              >
                กลับ
             </Button>
            </div>
          </form>
        </div>
      </Content>
    </Page>
  );
}
