
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Select,Typography, Spin, Input,Form  } from "antd";
import Button from '@material-ui/core/Button';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from 'moment'


const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;
const { Title } = Typography;

class CustomLayout extends Component {
  constructor(props){ 
    super(props);
    this.state = {
        articles:[],
        selectedSlug:'',
        selectedDate:'',
        articleData:[['', [{'category_id': '', 'date': '', 'id': 1, 'link': '', 'sentence': {}, 'title': ''}]]],
        loading:false,
        dateArray:[],
        dateState:''
    }
  }

  async componentDidMount() {
    const { dateArray } = this.state;
    var date = new Date();
    for(let i = 0 ; i < 5 ; i++){  
      var date = new Date();    
      dateArray[i] = moment(date.setDate(date.getDate() - i)).format('YYYY-MM-DD');       
    } 
    console.log('dateArray',dateArray)


    const url = 'https://bsa-web.herokuapp.com/get_stored_categories';
    const response = await fetch(url , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    });
    
    const res = await response.json();
    
    var retval = Object.entries(res.articles)
    this.setState({
      articles:retval
  })
    console.log('hamza',res.articles);
    console.log('hamza',retval);
  
  }

  async getArticle(slug){
    this.setState({
      loading:true
    })
    this.setState({
      selectedSlug:slug
    })
    console.log('im hit')
    const dataToBeSent = {
      slug:slug,
      recent:'true',
      date:''
    }

    const url = 'https://bsa-web.herokuapp.com/get_articles';
    const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body:JSON.stringify(dataToBeSent),
    });
    var retval = await response.json();
    const articleResponse = Object.entries(retval);
    console.log('articleResponse my',articleResponse)
    console.log('articleResponse my retval',retval)
    
    // var text_arr =[];
    // for(let k = 0 ; k < articleResponse.length ; k++){
    //   for(let i = 0 ; i < articleResponse[k] ; i++){
    //     text_arr[i] = articleResponse[k][i];
    //    }
   
    //  } 
    // console.log('asdasdasd',text_arr)
  //   for(let i = 0 ; i < articleResponse.articles.length ; i++){
  //     text_arr [i] = articleResponse.articles[i].sentence.split(",");
  //    } 

  // for(let i = 0 ; i < articleResponse.articles.length ; i++){  
  //   articleResponse.articles[i].sortedData = text_arr[i]
  // } 
  
    this.setState({
      articleData:articleResponse,
      loading:false,
      dateState:''
    })
    console.log('MY ARTICLE',this.state.articleData)
    // console.log('text_arr',text_arr)
  }


  async getArticleWithDate(){
    this.setState({
      loading:true
    })
    console.log('im hit')
    const dataToBeSent = {
      slug:this.state.selectedSlug,
      recent:'false',
      date:this.state.selectedDate
    }

    const url = 'https://bsa-web.herokuapp.com/get_articles';
    const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataToBeSent),
    });
    
    const articleResponse = await response.json();
    console.log(articleResponse);
    var text_arr =[];
    for(let i = 0 ; i < articleResponse.articles.length ; i++){
      text_arr [i] = articleResponse.articles[i].sentence.split(",");
    
      // articleResponse.articles.sample[i] = text_arr
  } 

  for(let i = 0 ; i < articleResponse.articles.length ; i++){  
    articleResponse.articles[i].sortedData = text_arr[i]
  } 
    // articleResponse.articles.sample = text_arr
    this.setState({
      articleData:articleResponse.articles,
      loading:false,
      dateState:articleResponse.articles[0].date
    })
    console.log('MY ARTICLE',articleResponse)
    console.log('text_arr',text_arr)
  }
  

  handleChange = (value) => {
    this.setState({
      selectedDate:value
    })
    console.log(this.state.selectedDate)
  }

  async onFinish (values) {
    console.log(values);
    const url = 'https://bsa-web.herokuapp.com/store_email';
    const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': "application/json; charset=utf-8",
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

    const{ articles, articleData , dateArray} = this.state ;
    const resume = articles.map((items, i) => {
      return (
         <SubMenu title={items[0]}>
         {items[1].map((deal, idx) =>
         <Menu.Item
         onClick={() => this.getArticle(deal.slug)}   
        >{deal.category}</Menu.Item>  
          )}                      
        </SubMenu>
      )
    });
    return ( 
      <Spin spinning={this.state.loading}>  
   
      <Layout>
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
          <Button size={'large'}
           onClick={() => this.gotoLink('news')}
           style={{marginLeft:'15px'}}
          type='secondary'>
           Newsletter
          </Button>
         </div>
      </Header>
      <Layout style={{marginTop:'60px'}}>
        <Sider width={400}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
        className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ color:'black', backgroundColor:'#FAEEDC', height: "100%", borderRight: 0 }}
          >
          {resume}

          </Menu>
        </Sider>
        <Layout style={{ color:'black', backgroundColor:'white', padding: "0 24px 24px",marginLeft: 400  }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ padding: "30px 50px 0 50px" }}>


          </div>
     
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{ background: '#fff', padding: 24, minHeight: 280,textAlign:'left' }}
              className="site-layout-content"
            >
        
          {articleData.map((items,idx) =>
          <React.Fragment>
          <Title level={4}>{items[0]}
           </Title>  
          {items[1].map((ingredientsDeal, indx) =>
            <div style={{ margin:'0 0 30px 0'}}>
            <a target='_blank' href={ingredientsDeal.link == null ? '' : ingredientsDeal.link}>
            <Title level={3}>{ingredientsDeal.title}  </Title>  
            </a>
            <ul style={{textTransform:'capitalize'}}>
            {Object.values(ingredientsDeal.sentence).map((itemSentence, indxx) =>
            <li> {itemSentence.sentence}</li> 
            )}      
           
            </ul>

            </div>
            
          )} 
          </React.Fragment>
        
          )}
            </div>
          </Content>

          <Footer id='news' style={{background:'black', textAlign: 'left' }}>

          <Title level={2}>Interested in a weekly digest?</Title>
            Sign up for our waitlist
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
      </Layout>
    </Layout>
    </Spin>
    );
  }
}
 
export default CustomLayout;
