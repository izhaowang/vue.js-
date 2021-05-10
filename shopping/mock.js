const Mock = require('mockjs');
const Random = Mock.Random // 生成随机数据
let data = [
    {
        id: 1,
        name: 'AirPods',
        brand: 'Apple',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 10000,
        cost: 1288,
        color: '白色'
    },
    {
        id: 2,
        name: 'BeatsX 入耳式耳机',
        brand: 'Beats',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 11000,
        cost: 1188,
        color: '白色'
    },
    {
        id: 3,
        name: 'Beats Solo3 Wireless 头戴式式耳机',
        brand: 'Beats',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 5000,
        cost: 2288,
        color: '金色'
    },
    {
        id: 4,
        name: 'Beats Pill+ 便携式扬声器',
        brand: 'Beats',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 3000,
        cost: 1888,
        color: '红色'
    },
    {
        id: 5,
        name: 'Sonos PLAY:1 无线扬声器',
        brand: 'Sonos',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 8000,
        cost: 1578,
        color: '白色'
    },
    {
        id: 6,
        name: 'Powerbeats3 by Dr. Dre Wireless 入耳式耳机',
        brand: 'Beats',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 12000,
        cost: 1488,
        color: '金色'
    },
    {
        id: 7,
        name: 'Beats EP 头戴式耳机',
        brand: 'Beats',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 25000,
        cost: 788,
        color: '蓝色'
    },
    {
        id: 8,
        name: 'B&O PLAY BeoPlay A1 便携式蓝牙扬声器',
        brand: 'B&O',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 15000,
        cost: 1898,
        color: '金色'
    },
    {
        id: 9,
        name: 'Bose® QuietComfort® 35 无线耳机',
        brand: 'Bose',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 14000,
        cost: 2878,
        color: '蓝色'
    },
    {
        id: 10,
        name: 'B&O PLAY Beoplay H4 无线头戴式耳机',
        brand: 'B&O',
        image: Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
        sales: 9000,
        cost: 2298,
        color: '金色'
    }
]
Mock.mock('/plist', data);