import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;

// axios.defaults.headers = {
//     "content-type": 'application/x-www-form-urlencoded;charset=UTF-8'
// }
// axios.defaults.baseURL = 'https://www.ciplat.com/'; //正式
axios.defaults.baseURL = 'https://wxshiptest.xzitc.com/'//测试

//http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log(config)
        config.data = qs.stringify(config.data);
        // config.headers = {
        //     "Access-Control-Allow-Origin": "http://10.0.0.103:8080/",
        //     "Access-Control-Allow-Credentials": "true",
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    console.log(response)
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log('错误请求')
                break;
            case 401:
                console.log('未授权，请重新登录')
                break;
            case 403:
                console.log('拒绝访问')
                break;
            case 404:
                console.log('请求错误,未找到该资源')
                break;
            case 405:
                console.log('请求方法未允许')
                break;
            case 408:
                console.log('请求超时')
                break;
            case 500:
                console.log('服务器端出错')
                break;
            case 501:
                console.log('网络未实现')
                break;
            case 502:
                console.log('网络错误')
                break;
            case 503:
                console.log('服务不可用')
                break;
            case 504:
                console.log('网络超时')
                break;
            case 505:
                console.log('http版本不支持该请求')
                break;
            default:
                console.log(`连接错误${err.response.status}`)
        }
    } else {
        console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export function postFormData(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            headers: {
                'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
            },
            transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
                const formData = new FormData()
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key])
                })
                return formData
            }],
            url,
            method: 'post',
            data: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}


/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/
export const server = {
    exam: function (paramObj) {
        return fetch('index.php?c=login&a=send_sms', paramObj);
    },
    code: function (paramObj) {
        return post('index.php?c=login&a=check_verify_code', paramObj);
    },
    regist: function (paramObj) {
        return post('index.php?c=login&a=regist', paramObj);
    },

    perfect: function (paramObj) {
        return post('index.php?c=login&a=perfect', paramObj);
    },
    // 登录
    login: function (paramObj) {
        return post('index.php?c=login&a=login', paramObj);
    },
    // 比对公司名，查看是否需要认领公司
    check_firm_name: function (paramObj) {
        return post('index.php?c=login&a=check_firm_name', paramObj);
    },
    //查询作业列表
    Liquid: function (paramObj) {
        return fetch('index.php?c=Liquid&a=index', paramObj);
    },
    //提交新建作业 
    addresult: function (paramObj) {
        return post('index.php?c=Liquid&a=addresult', paramObj);
    },
    //上传图片
    upImg: function (paramObj) {
        return post('index.php?c=Login&a=upload_ajax', paramObj);
    },
    //认领公司
    claimedFirm: function (paramObj) {
        return post('index.php?c=Login&a=claimed_firm', paramObj);
    },
    //上传文件
    upClaimedFirm: function (paramObj) {
        return postFormData("index.php?c=Upload&a=claimed_file", paramObj);
    }

}