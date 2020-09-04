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
                      ByteSizeArXiv.org Built by Alex with Support from Neeraj Using TFIDF Text Summarization
                  </Title>
                     Byte Size Arxiv takes the articles published to ArXiv.org, isolates unique sentences in the abstract using TF-IDF

                Term Frequency - Inverse Document Frequency
                Creates a score for each word (ignoring stopwords). If a given word appears frequently in the abstract it’s score goes up. However, if the word is also common amongst the abstracts of all of the other articles, the score goes down.
                The words with the highest scores are the most import words unique to the article in question!
              </Col>
              <Col span={14}>
              <img height='400px' width='' src={require('../assets/BSA.gif')}/>
              </Col>
              </Row>
   
              
              </div>
                <Title level={3}>
                      About Alex
                  </Title>
                Alex Duffy is a data and analytics tech. consultant for EY based in Los Angeles California. He studied Electrical and Computer Engineering at Northeastern University and has experience working as an engineer, product manager, and designer at Hasbro and Amazon Robotics. Alex is passionate about using technology, especially machine learning, to improve education.
            </Content>
                <Title level={3}>
                      About Neeraj
                  </Title>
                Neeraj Sudhakar is a rising senior pursuing a combined BS/MS at Northeastern University. He is studying Chemical Engineering and Engineering Management with a focus on Data Science and has experience worked in quantitative financial services, biopharmaceuticals and drug development. Neeraj has a special interest in the applications of techonology and machine learning in the financial services industry.

            <Footer id='news' style={{ textAlign: 'center' }}>
          <Title>Subscribe to Our Newsletter</Title>
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