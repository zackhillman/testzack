import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb,Row,Col,Typography,Button,Form,Input} from 'antd';
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
class About extends Component {
    state = {  }

    async onFinish (values) {
        console.log(values);
        const url = 'http://127.0.0.1:8000/store_email';
        const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "email":values.email
        }),
        });
        
        const emailResponse = await response.json();
      };
    
       gotoLink (ele){
        let offsetTop  = document.getElementById(ele).offsetTop;
        window.scrollTo({
            top: offsetTop-100, 
            behavior: "smooth"
        });
    }
    render() { 
        return ( 
            <Layout style={{background:'#fbfbfb'}} className="layout">
      <Header className="header">
      <div className="logo" style={{textAlign:'left',float:'left'}}>
      <img height='50' width='' src={require('../assets/BSA_Logo.png')}/> 
      </div>
      <div style={{textAlign:'right'}}>
      <Button
       onClick={() => this.gotoLink('news')}  
      type='primary'>
       Newsletter
      </Button>
      <Button
      style={{marginLeft:'15px'}}
      type='primary'>
      <Link to='/about'>
      About
      </Link>
       
      </Button>
      </div>

    </Header>
            <Content style={{ padding: '0 50px' ,margin:'60px 0'}}>
     
              <div className="site-layout-content">
              <Row style={{margin:'30px 0'}}>
              <Col span={10} style={{paddingTop:'10em'}} >
      
                  <Title level={3}>
                

I think Link component does not have the props for it.

You can have alternative way by create a tag and use the makeHref method of Navigation mixin to create your url
                  </Title>
         
              </Col>
              <Col span={14}>
              <img height='400px' width='' src={require('../assets/BSA.gif')}/> 
              </Col>
              </Row>
   
              
              </div>
            </Content>
            <Footer id='news' style={{ textAlign: 'center' }}>
          <Title>Subscribe to newsletter</Title>
          <Form name='myform' onFinish={this.onFinish}>
          <Form.Item name='email'>
          <Input
        
          style={{margin: '0 auto',width:'200px'}}
          placeholder="Email" />
  
          </Form.Item>
          <Button   
          type="primary"
          htmlType="submit">
          Submit
        </Button>
          </Form>
 
          </Footer>
           
          </Layout>
         );
    }
}
 
export default About;