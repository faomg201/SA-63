import React, { useState, useEffect } from 'react';
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
import { Alert } from '@material-ui/lab';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { EntUser } from '../../api/models/EntUser';
import { EntFOODMENU } from '../../api/models/EntFOODMENU';
import { EntMainingre } from '../../api/models/EntMainingre';
import { EntSource } from '../../api/models/EntSource';

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

export default function Create() {
  const classes = useStyles();
  const profile = { givenName: 'บันทึกแหล่งที่มาของอาหาร' };
  const api = new DefaultApi();
  const [loading, setLoading] = useState(true);

  const [users, setUser] = useState<EntUser[]>([]);
  const [foodmenus, setFOODMENU] = useState<EntFOODMENU[]>([]);
  const [mainingres, setMainingre] = useState<EntMainingre[]>([]);
  const [sources, setSource] = useState<EntSource[]>([]);

  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);

  const [userid, setUserID] = useState(Number);
  const [foodmenuid, setFOODMENUID] = useState(Number);
  const [mainingreid, setMainingreID] = useState(Number);
  const [sourceid, setSourceID] = useState(Number);

  useEffect(() => {
    const getUser = async () => {
      const res = await api.listUser({ limit: 10, offset: 0 });
      setLoading(false);
      setUser(res);
    };
    getUser();

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

  const UserhandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserID(event.target.value as number);
  };

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
      recordUSER: userid
    };

    console.log(recordfood);
    const res: any = await api.createRecordfood({ recordfood: recordfood });
    setStatus(true);
    if (res.id != '') {
      setAlert(true);
    } else {
      setAlert(false);
    };
  };

  return (
    <Page theme={pageTheme.home}>
      <Header
        title={` ${profile.givenName || 'to Backstage'}`}
        subtitle=""
      ></Header>
      <Content>
        <ContentHeader title="เพิ่มข้อมูลแหล่งที่มาของอาหาร">
          <div>
            <Button variant="contained" color='primary' size='large' >
              <font size='3'>ป้อนอีเมล์ผู้ใช้งาน</font>
            </Button>
          </div>
          <div>
            <FormControl
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel id="user-label">User Email</InputLabel>
              <Select
                labelId="user-label"
                id="user"
                value={userid}
                onChange={UserhandleChange}
                style={{ width: 250 }}
              >
                {users.map((item: EntUser) => (
                  <MenuItem value={item.id}>{item.uSEREMAIL}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>


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
            <div>
              <Button variant="contained" color='secondary' size='large'>
                <font size='3'>ชื่ออาหาร</font>
              </Button>
            </div>
            <div>
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
            </div>
            <div>
              <Button variant="contained" color='secondary' size='large'>
                <font size='3'>ชื่อวัตถุดิบหลักก</font>
              </Button>
            </div>
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
              <div>
                <Button variant="contained" color='secondary' size='large'>
                  <font size='3'>ชื่อร้านอาหาร</font>
                </Button>
              </div>
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
