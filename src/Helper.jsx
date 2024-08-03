import React from 'react';

const Helper = () => {


  return (
    
<div className="about-me-container" style={{
  position:'absolute', 
  right:'10px',
  top:'45px',
  
  padding:'10px',
  backgroundColor:'white',
  border:'1px solid black',
  borderRadius:'5px',
  boxShadow:'0 2px 5px rgba(0,0,0,0.2)',
  zIndex:'100',
  fontSize:'0.8em'
  }}>

学习材料列表 - 点击最上方标题，再击消失<br />
句子翻页 - 上一页:【PREV】，下一页:【NEXT】<br />
语音播放 - 点击【PLAY】，慢速播放:双击【PLAY】<br />
空白等级 - 点击【Lev N】，选择1-5空白等级<br />
中译文 - 点击【CHN】，隐藏中译文；再点击则再现<br />
语音填空 - 点击【START】；再点击则停止<br />
临时显示全文 - 按住【FULL】，松开则恢复<br />
持久显示全文 - 双击【FULL】，再双击恢复填空模式<br />
改变英文字体大小 - 循环点击【Font Size】
</div>

  );
};

export default Helper;
