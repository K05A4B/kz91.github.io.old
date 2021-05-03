function url(id){
    $.ajax({
        url : '/Download/list.json',
        type : 'GET',
        dataType : 'text',
        async : true,
        success :function(data){
            data = JSON.parse(data)
            var json_data = data.filter(function(data){
                return data.id == id
            });
            var get_id = JSON.stringify(json_data)
            console.log(get_id)
            
            var file_info_delete = JSON.stringify(JSON.parse(get_id))
            var file_info_replace = file_info_delete.replace('[', '')
            file_info_replace = file_info_replace.replace(']', '')
            if (file_info_replace == ''){
                $('#status').text('下载失败！')
                $('#status_2').text('原因：没有查询到您输入的ID！')
                $('#dian').remove()
            }
            else{
                var file_info = JSON.parse(file_info_replace)
                $('#file_name').text(file_info.name)
                $('#size').text(file_info.size)
                $('#file_id').text(file_info.id)
                $('#file_info').text(file_info.info)
                $('#file_type').text(file_info.type)
                //$('#download_button').attr('href', file_info.url)
                $.ajax({
                    url : file_info.url,
                    type : 'GET',
                    dataType : 'text',
                    async : true,
                    success : function(data){
                        var download_url = JSON.parse(data)
                        $('#download_button').attr('href', download_url.info)
                        if (download_url.status == 1){
                            document.location = download_url.info
                        }
                        else{
                            alert('文件自动下载失败，请手动下载！')
                        }

                    }
                });
        }
        },
        error:function(error_data){
            alert('在查询文件ID时发生了致命错误！\n\n非常抱歉文件下载链接未成功获取！\n\n错误信息：' + error_data)
        }
    })
}

function download_music(url, type){
    var type_replace = type.replace('qq', 'tencent')
    type_replace = type_replace.replace('wy', 'netease')
    var id = url.replace('https://y.qq.com/n/yqq/song/', '')
    id = id.replace('.html', '')
    id = id.replace('https://music.163.com/#/song?id=', '')
    alert(id)
    $.ajax({
        url : 'https://api.vvhan.com/api/music?id=' + id + '&type=song&media=' + type_replace,
        type : 'GET',
        dataType : 'text',
        async : true,
        success : function(data){
            data = JSON.parse(data)
            //document.location = data.mp3url //歌曲链接
            var mp3 = data.mp3url
            var name = data.name
            var zz = data.author
            $.ajax({
                url : mp3,
                type : 'GET',
                dataType : 'text',
                success : function(data){
                    download(data.toString(2), name + ' - ' + zz + '.mp3', 'aduio/mp3')
                }
            })
        },
        error : function(){
            window.location.href = '/Download/?id='
        }
    })
}