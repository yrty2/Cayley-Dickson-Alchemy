const cdalgebra={
    mul(u,v){
        if(u.length==1 && v.length==1){
            return [u[0]*v[0]];
        }else{
        if(Math.log2(u.length)%1>0 || Math.log2(v.length)%1>0){
            console.error("定義されていません！");
            return;
        }
        const a=u.slice(0,u.length/2);
        const b=u.slice(u.length/2,u.length);
        const c=v.slice(0,v.length/2);
        const d=v.slice(v.length/2,v.length);
        //ケーリーディクソン構成
        return [...this.sub(this.mul(a,c),this.mul(this.conjugate(d),b)),...this.sum(this.mul(d,a),this.mul(b,this.conjugate(c)))];
        }
    },
    conjugate(z){
        let res=[];
        for(let k=1; k<z.length; ++k){
            res.push(-z[k]);
        }
        return [z[0],...res];
    },
    norm(z){
        let res=0;
        for(let k=0; k<z.length; ++k){
            res+=Math.pow(z[k],2);
        }
        return Math.sqrt(res);
    },
    //基本配列操作
    prod(z,a){
        let res=[];
        for(let k=0; k<z.length; ++k){
            res.push(z[k]*a);
        }
        return res;
    },
    sum(u,v){
        let res=[];
        for(let k=0; k<u.length; ++k){
            res.push(u[k]+v[k]);
        }
        return res;
    },
    sub(u,v){
        let res=[];
        for(let k=0; k<u.length; ++k){
            res.push(u[k]-v[k]);
        }
        return res;
    }
}
var namedelement=["パワー","電気","メタル","コンセント","真空管","ワイヤー","コンピュータ","バッテリー","硫黄","パイプ","扇風機","海底ケーブル","光昆布","深海シャジクモ","サンゴ","壊れたカメラ"];//16size array->sedenions
var minusName="アンチ";
function updateHTMLelement(){
    const r1=document.getElementById("res1");
    const r2=document.getElementById("res2");
    r1.innerHTML="<optgroup label='アッパータイプ'>";
    for(const n of namedelement){
        r1.innerHTML+=`<option>${n}</option>`;
    }
    r1.innerHTML+="</optgroup>";
    r1.innerHTML+="<optgroup label='ダウナータイプ'>";
    for(const n of namedelement){
        r1.innerHTML+=`<option>${minusName+n}</option>`;
    }
    r1.innerHTML+="</optgroup>";
    
    r2.innerHTML="<optgroup label='アッパータイプ'>";
    for(const n of namedelement){
        r2.innerHTML+=`<option>${n}</option>`;
    }
    r2.innerHTML+="</optgroup>";
    r2.innerHTML+="<optgroup label='ダウナータイプ'>";
    for(const n of namedelement){
        r2.innerHTML+=`<option>${minusName+n}</option>`;
    }
    r2.innerHTML+="</optgroup>";
}
updateHTMLelement();
function multiply(){
    const result=document.getElementById("result");
    result.innerHTML="";
    const iu=document.getElementById("res1").value;
    const iv=document.getElementById("res2").value;
    var u=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var v=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    if(iu.indexOf(minusName)==-1){
        u[namedelement.indexOf(iu)]=1;
    }else{
        u[namedelement.indexOf(iu.slice(minusName.length))]=-1;
    }
    if(iv.indexOf(minusName)==-1){
        v[namedelement.indexOf(iv)]=1;
    }else{
        v[namedelement.indexOf(iv.slice(minusName.length))]=-1;
    }
    const z=cdalgebra.mul(u,v);
    var ext="";
    for(let k=0; k<z.length; ++k){
        if(z[k]==1){
            ext+=namedelement[k];
        }
        if(z[k]==-1){
            ext+=minusName+namedelement[k];
        }
    }
    result.innerHTML+=ext;
}