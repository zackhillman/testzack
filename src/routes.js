import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';
import CSLGList from './containers/CSLGListView';
import About from './containers/About';
import CustomLayout from './containers/Layout';

const BaseRouter = () =>(
    <div>
        <Route exact path = '/' component = {CustomLayout} />
        <Route path = '/about' component = {About} />
        <Route exact path = '/test' component = {CSLGList} />
        <Route exact path = '/:articleID' component = {ArticleDetail} />
    </div>

);

export default BaseRouter;