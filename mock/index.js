import Mock from  'mockjs';
import User from './user'

Mock.mock('/login', 'get', User.response);
// Mock.mock('/login', 'get', {code:0, data: "dasdas"});