
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Select,Button,Typography, Spin } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from 'moment'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

class CustomLayout extends Component {
  constructor(props){ 
    super(props);
    this.state = {
        articles:[],
        selectedSlug:'',
        selectedDate:'',
        articleData:[],
        loading:false,
        dateArray:[]
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


    const url = 'http://127.0.0.1:8000/get_stored_categories';
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
    const url = 'http://127.0.0.1:8000/get_articles';
    const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataToBeSent),
    });
    
    const articleResponse = await response.json();
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
      loading:false
    })
    console.log('MY ARTICLE',articleResponse)
    console.log('text_arr',text_arr)
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
    const url = 'http://127.0.0.1:8000/get_articles';
    const response = await fetch(url , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataToBeSent),
    });
    
    const articleResponse = await response.json();
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
      loading:false
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
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={400} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
          {resume}

          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ padding: "30px 50px 0 50px" }}>
          <div style={{textAlign:'left'}}>Select Date</div>
             <Select defaultValue="Recent" style={{ width: 200,margin: "5px 0 16px 0",float:'left' }} onChange={this.handleChange}>
             {dateArray.map((date, indx) =>
             <Option value={date}>{date}</Option>    
             )}
           
               
          </Select>
          <Button
          style={{
            float: 'left',
            margin: '5px 20px 0 26px'
        }}
          onClick={() => this.getArticleWithDate()}   
          type="primary">
          Submit
        </Button>
          </div>
     
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{ background: "#fff", padding: 24, minHeight: 280,textAlign:'left' }}
              className="site-layout-content"
            >
          {articleData.map((items,idx) =>
          <div style={{margin:'0 0 30px 0'}}>
          <Title level={3}>{items.title}</Title>  
          <ul style={{textTransform:'capitalize'}}>   
          {items.sortedData.map((ingredientsDeal, indx) =>
          <li> {ingredientsDeal.replace('[','').replace(']','').replace("'","").replace("'","")}</li> 
          )}      
         
          </ul>
          </div>        
          )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </Spin>
    );
  }
}
 
export default CustomLayout;
