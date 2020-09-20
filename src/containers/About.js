import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb,Row,Col,Typography,Form,Input} from 'antd';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
            <Layout className="layout">
      <Header className="header" style={{backgroundColor:'#FAEEDC'}}>
        <div className="logo" style={{color:'#FAEEDC', textAlign:'left',float:'left'}}>
         <Title level={2} style={{marginLeft:'2.2em', color:'black', paddingTop:'10px'}}>
             Byte Size Arxiv
         </Title>
        </div>
        <div style={{textAlign:'right', paddingRight:'6.1em'}}>

          <Button size='large' href='/'>
          Home
          </Button>
          <Button size='large'
              style={{marginLeft:'15px'}}
         href = '/B.S.A.'>
          B.S.A.
          </Button>
          <Button
           onClick={() => this.gotoLink('news')}
           style={{marginLeft:'15px'}}
          type='secondary'>
           Newsletter
          </Button>
         </div>
      </Header>
            <Content style={{color:'#323030', backgroundColor:'white', padding: '0 50px' ,margin:'60px 0', marginLeft:'5em', marginRight:'5em'}}>
     

              <Row style={{paddingLeft: '10em', paddingTop:'5em', margin:'30px 0'}}>
              <Col span={9} style={{fontsize:'100', textAlign:'left', paddingTop:'.5em'}} >
      
                  <Title level={1} style={{color:'black'}}>
                      Welcome to Byte Size Arxiv
                  </Title>
                   <Title level={4} style={{color:'black'}}>
                      We are on a mission to make it easy for you to stay up to date with cutting edge research being shared on Arxiv.org.
                  </Title>
                  <Row style={{paddingTop:'1em'}}>
                      <Title level={4} style={{color:'black'}}>
                      To get started, click the button below and select a category to browse.
                      Byte-Size summaries of brand new publications are made daily using Machine Learning.
                  </Title>
                  </Row>
                  <Row style={{paddingLeft:'5em',paddingTop:'2em'}}>
                  <Button
                      variant='outlined' href='/B.S.A.'>
                      Try Byte Size Arxiv
                  </Button>
                  </Row>
              </Col>
              <Col span={1} style={{paddingLeft:'18em', textAlign:'right', paddingBottom:'2em'}}>
              <img height='350px' width='' src={require('../assets/BSA_Logo.png')}/>
              </Col>
              </Row>
                  <Row>
                      <Col span={24} style={{textAlign:'center', paddingTop:'3em', padding:'2em'}}>
                      <Title level={1} style={{color:'black'}}>
                      Building B.S.A.
                      </Title>
                      </Col>
                    </Row>

                  <Row>
                    <Col span={11} style={{paddingLeft:'8em', textAlign:'left'}}>
                    <img height='500px' width='' src={require('../assets/BSA.gif')}/>
                    </Col>
                    <Col span={12} style={{paddingLeft:'8em', textAlign:'left', paddingTop:'3em', paddingRight:'1em'}} >
                    <Title level={4} style={{color:'black'}}>
                        Everyday there are hundreds of peer-reviewed academic papers filled with cutting edge research being uploaded to Cornelle's Arxiv.org. Byte Size Arxiv takes the articles as they are uploaded and isolates three key sentences in the abstract for a quickly digestible summary.
                        This is done using term frequency–inverse document frequency (TF-IDF), a machine learning model.
                    </Title>
                    <Title level={4} style={{colo:'black'}}>
                        The model
                        creates a score for each word (ignoring stopwords). If a given word appears frequently in the abstract it’s score goes up. However, if the word is also common amongst other articles, the score goes down.
                        The words with the highest scores are the most import words unique to the article in question!
                    </Title>
                        <Row style={{paddingTop:'1em'}}>
                            <Title level={4} style={{color:'black'}}>
                     Our goal is to spread this valuable knowledge by sharing key themes at a glance. Please reach out with any questions, concerns or opportunities. We would love to chat!
                            </Title>
                        </Row>
                    </Col>
                  </Row>
                  <Row>
                      <Col span={24} style={{textAlign:'center', paddingTop:'2em'}}>
                     <Title level={1} style={{color:'black', paddingBottom:'1em'}}>
                      About the Founders
                  </Title>
                          </Col>
                    </Row>
               <Row style={{margin:'2em 0'}}>
                   <Link to="https://www.linkedin.com/in/alex-d/">
              <Col span={6} style={{paddingLeft:'20em'}}>
              <img height='300px' width='' src={require('../assets/duffy.jpg')}/>
              </Col>
                </Link>
              <Col span={11}  style={{paddingTop:'.5em', paddingLeft:'7em', textAlign:'left', paddingBottom:'2em' }}>
                  <Title level={2}>
                      Alex Duffy
                  </Title>
                  <Title level={4}>
                    Hi, I'm Alex! I currently work at EY as a Data and Analytics Consultant and am based out of Los Angeles, CA. Prior to EY, I've been lucky to have spent time at Amazon Robotics, Hasbro, ENSEEIHT in France, and MathTree
                    as an engineer, designer, researcher, and instructor.
                   </Title>
                   <Title level={4}>
                    Ambiguous problems excite me - I'm curious about building for technical progress in society, particularly how to improve our approach to education.
                    Education is especially important as it is a required tool for chasing dreams.
                   </Title>
                   <Title level={4}>
                    Alex received his B.S. in Electrical and Computer Engineering from Northeastern University.
                   </Title>
                   <Title level={4}>
                    Get in touch : alx.dfy@gmail.com
                   </Title>
              </Col>
               </Row>
                             <Row style={{margin:'2em 0'}}>
                   <Link to="https://www.linkedin.com/in/alex-d/">
              <Col span={6} style={{paddingLeft:'20em'}}>
              <img height='300px' width='' src={require('../assets/duffy.jpg')}/>
              </Col>
                </Link>
              <Col span={11}  style={{paddingTop:'.5em', paddingLeft:'7em', textAlign:'left' , paddingBottom:'2em' }}>
                  <Title level={2}>
                      Alex Duffy
                  </Title>
                  <Title level={4}>
                    Hi, I'm Alex! I currently work at EY as a Data and Analytics Consultant and am based out of Los Angeles, CA. Prior to EY, I've been lucky to have spent time at Amazon Robotics, Hasbro, ENSEEIHT in France, and MathTree
                    as an engineer, designer, researcher, and instructor.
                   </Title>
                   <Title level={4}>
                    Ambiguous problems excite me - I'm curious about building for technical progress in society, particularly how to improve our approach to education.
                    Education is especially important as it is a required tool for chasing dreams.
                   </Title>
                   <Title level={4}>
                    Alex received his B.S. in Electrical and Computer Engineering from Northeastern University.
                   </Title>
                   <Title level={4}>
                    Get in touch : alx.dfy@gmail.com
                   </Title>
              </Col>
               </Row>
            </Content>

            <Footer id='news' style={{backgroundColor:'black', textAlign: 'left' }}>
          <Title level={3}>Interested in a Weekly Digest?</Title>
                Sign up for our Waitlist
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