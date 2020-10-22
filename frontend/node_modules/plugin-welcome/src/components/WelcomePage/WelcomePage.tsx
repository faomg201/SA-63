import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ComponanceTable from '../Table';
import Button from '@material-ui/core/Button';
 
import {
 Content,
 Header,
 Page,
 pageTheme,
 ContentHeader,
 Link,
} from '@backstage/core';
 
const WelcomePage: FC<{}> = () => {
 const profile = { givenName: 'ตารางบันทึกแหล่งที่มาของอาหาร' };
 
 
 return (
   <Page theme={pageTheme.home}>
     <Header
       title={` ${profile.givenName || 'to Backstage'}`}
       subtitle="บอกข้อมูลแหล่งที่มาของอาหาร"
     ></Header>
     <Content>
       <ContentHeader title="Source">
         <Link component={RouterLink} to="/Recordfood">
           <Button variant="contained" color="primary">
             เพิ่มข้อมูล
           </Button>
         </Link>
       </ContentHeader>
       <ComponanceTable></ComponanceTable>
     </Content>
   </Page>
 );
};
 
export default WelcomePage;