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
      <Header className="header">
      <div className="logo" style={{textAlign:'left',float:'left'}}>
          <Link to={'/B.S.A.'}>
      <img height='50' width='' src={require('../assets/BSA_Logo.png')}/>
              </Link>
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
      <Link to='/'>
      Home
      </Link>
      </Button>
      <Button
          style={{marginLeft:'15px'}}
      type='primary'>
      <Link to='/B.S.A.'>
      B.S.A.
      </Link>
      </Button>

      </div>
    </Header>
            <Content style={{padding: '0 50px' ,margin:'60px 0'}}>
     
              <div className="site-layout-content">
              <Row style={{margin:'30px 0'}}>
              <Col span={17} style={{paddingTop:'3em', paddingRight:'3em'}} >
      
                  <Title level={1}>
                      Welcome to Byte Size Arxiv
                  </Title>
                     Byte Size Arxiv takes the articles published to ArXiv.org, isolates unique sentences in the abstract using TF-IDF

                Term Frequency - Inverse Document Frequency
                Creates a score for each word (ignoring stopwords). If a given word appears frequently in the abstract it’s score goes up. However, if the word is also common amongst the abstracts of all of the other articles, the score goes down.
                The words with the highest scores are the most import words unique to the article in question! Click on the GIF to the right or the B.S.A. button to view summarized ArXiv.org articles of your choice.
              </Col>
                <Link to={'/B.S.A.'}>
              <Col span={7}>
              <img height='250px' width='' src={require('../assets/BSA_Logo.png')}/>
              </Col>
                </Link>
              </Row>
                  <Row>
                      <Col span={24} style={{paddingTop:'3em'}}>
                    <img height='400px' width='' src={require('../assets/BSA.gif')}/>
                          </Col>
                    </Row>
               <Row style={{margin:'12em 0'}}>
                   <Link to="https://www.linkedin.com/in/alex-d/">
              <Col span={6}>
              <img height='300px' width='' src={require('../assets/duffy.jpg')}/>
              </Col>
                </Link>
              <Col span={6} style={{paddingTop:'3em', paddingLeft:'3em'}} >

                  <Title level={3}>
                      About Alex Duffy
                  </Title>
Alex Duffy is a data and analytics tech. consultant for EY based in Los Angeles California. He studied Electrical and Computer Engineering at Northeastern University and has experience working as an engineer, product manager, and designer at Hasbro and Amazon Robotics. Alex is passionate about using technology, especially machine learning, to improve education.
              </Col>
                   <Link to="http://linkedin.com/in/neerajsudhakar">
                   <Col span={6} style={{paddingLeft:'10em'}}>
              <img height='300px' width='' src={require('../assets/neeraj.png')}/>
              </Col>
                </Link>
                   <Col span={6} style={{paddingTop:'3em', paddingLeft:'30px'}} >

                  <Title level={3}>
                      About Neeraj Sudhakar
                  </Title>
Neeraj Sudhakar is a rising senior pursuing a combined BS/MS at Northeastern University. He is studying Chemical Engineering and Engineering Management with a focus on Data Science and has experience in quantitative finance, biopharmaceuticals and drug development. Neeraj has a special interest in the applications of techonology and machine learning in the financial services industry.                   </Col>
              </Row>
              </div>
            </Content>

            <Footer id='news' style={{background: '#68cd64', textAlign: 'left' }}>
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