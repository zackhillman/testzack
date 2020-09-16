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
            <Layout className="layout">
      <Header className="header" style={{backgroundColor:'#414040'}}>
      <div className="logo" style={{color:'white', textAlign:'left',float:'left'}}>
         <Title level={2} style={{marginLeft:'2.2em', color:'white', paddingTop:'10px'}}>
             Byte Size Arxiv
         </Title>
      </div>
      <div style={{textAlign:'right', paddingRight:'6.1em'}}>

      <Button
      type='secondary'>
      <Link to='/'>
      Home
      </Link>
      </Button>
      <Button
          style={{marginLeft:'15px'}}
      type='secondary'>
      <Link to='/B.S.A.'>
      B.S.A.
      </Link>
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
     

              <Row style={{paddingLeft: '3em', paddingTop:'5em', margin:'30px 0'}}>
              <Col span={13} style={{fontsize:'100', textAlign:'left', paddingTop:'.5em'}} >
      
                  <Title level={1} style={{color:'black'}}>
                      Welcome to Byte Size Arxiv
                  </Title>
                   <Title level={4} style={{color:'black'}}>
                      We are on a mission to make it easy for you to stay up to date with cutting edge research being shared on Arxiv.org.
                  </Title>
                  <Row style={{paddingTop:'1em'}}>
                      <Title level={4} style={{color:'black'}}>
                      To get started, click the button below and select a category and browse Byte-Size summaries of brand new publications automatically generated using Machine Learning.
                  </Title>
                  </Row>
                  <Row style={{paddingTop:'.5em'}}>
                      <Button
      type='secondary'>
      <Link to='/B.S.A.'>
      B.S.A.
      </Link>
      </Button>
                  </Row>
              </Col>
              <Col span={1} style={{paddingLeft:'8em', textAlign:'right'}}>
              <img height='250px' width='' src={require('../assets/BSA_Logo.png')}/>
              </Col>
              </Row>
                  <Row>
                      <Col span={24} style={{textAlign:'center', paddingTop:'3em'}}>
                     <Title level={1} style={{color:'black'}}>
                      Building B.S.A. with TF-IDF
                  </Title>
                          </Col>
                    </Row>
                  <Row>

                    <Col span={13} style={{paddingLeft:'3em', textAlign:'left', paddingTop:'.3em', paddingRight:'1em'}} >
                    <Title level={4} style={{color:'black'}}>
               Byte Size Arxiv takes the articles published to ArXiv.org, isolates unique sentences in the abstract using TF-IDF. TF-IDF
                        creates a score for each word (ignoring stopwords). If a given word appears frequently in the abstract it’s score goes up. However, if the word is also common amongst the abstracts of all of the other articles, the score goes down.
                    The words with the highest scores are the most import words unique to the article in question!
                    </Title>
                        <Row style={{paddingTop:'1em'}}>
                            <Title level={4} style={{color:'black'}}>
                     Please reach out with any questions, concerns or opportunities. We would love to chat!
                            </Title>
                  </Row>
                    </Col>
                      <Col span={1} style={{paddingLeft:'8em', textAlign:'right'}}>
              <img height='250px' width='' src={require('../assets/BSA.gif')}/>
              </Col>

                    </Row>
                  <Row>
                      <Col span={24} style={{textAlign:'center', paddingTop:'2em'}}>
                     <Title level={1} style={{color:'black'}}>
                      About the Founders
                  </Title>
                          </Col>
                    </Row>
               <Row style={{margin:'2em 0'}}>
                   <Link to="https://www.linkedin.com/in/alex-d/">
              <Col span={6}>
              <img height='300px' width='' src={require('../assets/duffy.jpg')}/>
                  <Row>
                      ajduff3@gmail.com
                  </Row>
              </Col>
                </Link>
              <Col span={12} style={{paddingTop:'.5em', paddingLeft:'3em'}} >

                  <Title level={2}>
                      Alex Duffy
                  </Title>
Alex Duffy is a data and analytics tech. consultant for EY based in Los Angeles California. He studied Electrical and Computer Engineering at Northeastern University and has experience working as an engineer, product manager, and designer at Hasbro and Amazon Robotics. Alex is passionate about using technology, especially machine learning, to improve education.
              </Col>
               </Row>
<Row style={{margin:'2em 0'}}>
                   <Link to="https://www.linkedin.com/in/alex-d/">
              <Col span={6}>
              <img height='300px' width='' src={require('../assets/duffy.jpg')}/>
                  <Row>
                      ajduff3@gmail.com
                  </Row>
              </Col>
                </Link>
              <Col span={12} style={{paddingTop:'.5em', paddingLeft:'3em'}} >

                  <Title level={2}>
                      Alex Duffy
                  </Title>
Alex Duffy is a data and analytics tech. consultant for EY based in Los Angeles California. He studied Electrical and Computer Engineering at Northeastern University and has experience working as an engineer, product manager, and designer at Hasbro and Amazon Robotics. Alex is passionate about using technology, especially machine learning, to improve education.
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