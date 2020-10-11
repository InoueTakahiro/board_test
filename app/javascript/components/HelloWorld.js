import React from "react"
class HelloWorld extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      mail: "",
      title: "",
      memo: "",
      categories: props.categories,
      posts: props.posts,
      category: props.category,
      edit_post: {id: 0},
      errors: null,
      url: props.url
    }
  }

  // 各入力域、値の変化
  nameChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.name = value;
      return {name: state.name}
    });
  }
  mailChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.mail = value;
      return {mail: state.mail}
    });
  }
  titleChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.title = value;
      return {title: state.title}
    });
  }
  memoChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.memo = value;
      return {memo: state.memo}
    });
  }
  editMemoChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.edit_post.memo = value;
      return {edit_post: state.edit_post}
    });
  }
  // Ajaxリクエスト
  // ajax_request = (method, data, url) => {
  //   return $.ajax({
  //       type: method,
  //       url: url,
  //       dataType: 'text',
  //       data: data,
  //       beforeSend: function(xhr){
  //           xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
  //       }
  //   })
  // }

  // 投稿ボタン
  submit_btn = () => {
    const res = ajax_request("POST", $('#post').serialize(), this.state.url);
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        posts: resJS.posts,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: resJS.errors
      });
    });
  }

  // カテゴリ選択
  change_category = (category_id) => {
    const res = ajax_request("GET", "", "/welcomes/" + category_id);
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        category: resJS.category,
        posts: resJS.posts,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: null
      })
    });
  }

  destroy_post = (post_id) => {
    const res = ajax_request("DELETE", "", "/welcomes/" + post_id)
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        posts: resJS.posts,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: null
      })
    });
  }

  edit_post = (post_id) => {
    const res = ajax_request("GET", "", "/welcomes/" + post_id + "/edit")
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        posts: resJS.posts,
        edit_post: resJS.edit_post,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: null
      })
    });
  }

  update_post = (post_id) => {
    const res = ajax_request("PUT", "memo=" + $("#memo").text(), "/welcomes/" + post_id)
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        posts: resJS.posts,
        edit_post: {id: 0},
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: resJS.errors
      })
    });
  }

  render () {
    let errorMsg = "";
    if(this.state.errors !== null){
      this.state.errors.map(
        (err, idx) => {
          errorMsg += err;
        }
      )      
    }

    return (
      <React.Fragment>
        <div id="errorMsg" className={errorMsg == "" ?  "alert alert-danger navbar fixed-top invisible" : "alert alert-danger navbar fixed-top"}>
          {errorMsg}
        </div>
        <ul className="nav nav-tabs">
        {this.state.categories.map(
            (category_, idx) => {
              return(<li className="nav-item"><button className={category_.id == this.state.category.id ? "nav-link btn_link active" : "nav-link btn_link"} onClick={this.change_category.bind(null, category_.id)}>{category_.name}</button></li>)
            })
          }
          <li className="nav-item"><button className="nav-link" onClick={ajax_request.bind(null, 'POST', "", "")}>新規追加</button></li>
        </ul>
        <form id="post" className="form-group input-group">

          <label>名前
            <input className="form-control" type="text" name="post[name]" value={this.state.name} onChange={this.nameChange.bind(this)} />
          </label>
          <label>メールアドレス
            <input className="form-control" type="text" name="post[mail]" value={this.state.mail} onChange={this.mailChange.bind(this)} />
          </label>
          <label>件名
            <input className="form-control" type="text" name="post[title]" value={this.state.title} onChange={this.titleChange.bind(this)} />
          </label>
          <label>本文
            <textarea className="form-control" name="post[memo]" onChange={this.memoChange.bind(this)} value={this.state.memo}></textarea>
          </label>
          <input type="hidden" name="post[category_id]" value={this.state.category.id} />
        </form>
        <button className="btn btn-primary" onClick={this.submit_btn}>投稿</button>
        <div className="card-columns">
        {this.state.posts.map(
          (post, idx) => {
            if(post.id !== this.state.edit_post.id){
                return(<div className="card">
                          <h4 className="card-header">{post.title}
                          </h4>
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted font-weight-light">{post.name}({post.mail})</h6>
                            <p className="card-text">{post.memo}</p>
                            <p className="float-right">
                              <button className="btn btn-info btn-sm" onClick={this.edit_post.bind(null, post.id)}>編集</button>
                              <button className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>削除</button>
                            </p>
                          </div>
                        </div>)
            }else{
              return(<div className="card">
                        <h4 className="card-header">{post.title}
                        </h4>
                        <div className="card-body">
                          <h6 className="card-subtitle mb-2 text-muted font-weight-light">{post.name}({post.mail})</h6>
                          <p className="card-text">
                            <textarea id="memo" className="form-control" name="memo" onChange={this.editMemoChange.bind(this)} value={this.state.edit_post.memo}></textarea>
                          </p>
                          <p className="float-right">
                            <button className="btn btn-info btn-sm" onClick={this.update_post.bind(null, post.id)}>更新</button>
                            <button className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>削除</button>
                          </p>
                        </div>
                      </div>)
            }
          }
        )}
        </div>
      </React.Fragment>
    );
  }
}


export default HelloWorld
