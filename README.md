# dockercmd
Use docker functions in your javascript code

## Installation
``` bash
$ npm install dockercmd
```

## Usage

``` javascript
var dockercmd = require( 'dockercmd' );
```

### Containers list
``` javascript
dockercmd.ps().then(result => {
    console.log(result);
});
```

**Return exemple :**

``` javascript
[
   {
      "id":"a5d55b5c3ebe",
      "port":"",
      "image":"hello-world",
      "created":"2017-07-24 11:56:50 +0200 CEST",
      "status":"Exited (0) About an hour ago"
   },
   {
      "id":"734121f89a41",
      "port":"",
      "image":"postgres:9.6-alpine",
      "created":"2017-07-19 16:29:23 +0200 CEST",
      "status":"Exited (0) About an hour ago"
   }
]
```

### Images list
``` javascript
dockercmd.images().then(result => {
    console.log(result);
});
```

**Return exemple :**

``` javascript
[
   {
      "id":"f6a9a3968e52",
      "repository":"postgres",
      "tag":"9.6-alpine",
      "size":"37.7 MB",
      "created":"2017-07-15 00:58:03 +0200 CEST"
   },
   {
      "id":"1815c82652c0",
      "repository":"hello-world",
      "tag":"latest",
      "size":"1.84 kB",
      "created":"2017-06-14 21:29:01 +0200 CEST"
   }{
      "id":"8a0824e0a178",
      "repository":"docker.elastic.co/elasticsearch/elasticsearch",
      "tag":"5.4.1",
      "size":"519 MB",
      "created":"2017-06-01 16:43:22 +0200 CEST"
   }
]
```

### Container stats
``` javascript
dockercmd.stats(container_id).then(result => {
    console.log(result);
});
```

**Return exemple :**

``` javascript
{
   "container_id":"734121f89a41",
   "cpu_perc":"0.04%",
   "mem_usage":{
      "used":"12.15 MiB",
      "limit":"15.56 GiB"
   },
   "mem_perc":"0.08%",
   "net_io":{
      "in":"0 B",
      "out":"0 B"
   },
   "block_io":{
      "in":"0 B",
      "out":"90.1 kB"
   }
}
```

### Start container
``` javascript
dockercmd.start(container_id).then(result => {
    console.log(result);
});
```

### Stop container
``` javascript
dockercmd.stop(container_id).then(result => {
    console.log(result);
});
```

### Remove container
``` javascript
dockercmd.rm(container_id).then(result => {
    console.log(result);
});
```

### Remove image
``` javascript
dockercmd.rmi(image_id).then(result => {
    console.log(result);
});
```

## License

[MIT license](http://opensource.org/licenses/MIT). 

[npm-image]: https://img.shields.io/npm/v/dockercmd.svg
[npm-url]: https://www.npmjs.com/package/dockercmd