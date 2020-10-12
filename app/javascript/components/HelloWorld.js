import React from "react"
class HelloWorld extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      mail: "",
      title: "",
      memo: "",
      users: props.users,
      categories: props.categories,
      posts: props.posts,
      category: props.category,
      user: props.user,
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

  // 非表示ボタン
  destroy_post = (post_id) => {
    if(confirm("非表示に設定しますか？")){
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
  }

  // ユーザー切り替え
  select_post = (user_id) => {
    const res = ajax_request("GET", "user_id=" + user_id + "&" + $('#post').serialize(), "/select_user")
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        users: resJS.users,
        categories: resJS.categories,
        posts: resJS.posts,
        category: resJS.category,
        user: resJS.user,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: null
      })
    });
  }

  // edit_post = (post_id) => {
  //   const res = ajax_request("GET", "", "/welcomes/" + post_id + "/edit")
  //   res.then((response) => {
  //     const resJS = JSON.parse(response);
  //     this.setState({
  //       posts: resJS.posts,
  //       edit_post: resJS.edit_post,
  //       name: "",
  //       mail: "",
  //       title: "",
  //       memo: "",
  //       errors: null
  //     })
  //   });
  // }

  // カテゴリー登録
  category_create = () => {
    const res = ajax_request("GET", $("#category").serialize() + "&" + $("#post").serialize(), "/category_create")
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        categories: resJS.categories,
        category: resJS.category,
        posts: resJS.posts,
        users: resJS.users,
        user: resJS.user,
        name: "",
        mail: "",
        title: "",
        memo: "",
        errors: null
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
        <nav className="navbar navbar-dark bg-dark text-white">
          <div className="dropdown open">
            <button className="btn btn-secondary dropdown-toggle"
                    type="button" id="dropdownMenu3" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
              {this.state.user.name}
            </button>
            <div className="dropdown-menu">
              <h6 className="dropdown-header">ユーザー切り替え</h6>
              {this.state.users.map((user_, idx) => {
                return(<button className="dropdown-item" onClick={this.select_post.bind(null, user_.id)}>{user_.name}</button>)
              })}
            </div>
          </div>
        </nav>
        <div id="errorMsg" className={errorMsg == "" ?  "alert alert-danger navbar fixed-top invisible" : "alert alert-danger navbar fixed-top"}>
          {errorMsg}
        </div>
        <ul className="nav nav-tabs">
        {this.state.categories.map(
            (category_, idx) => {
              return(<li className="nav-item"><button className={category_.id == this.state.category.id ? "nav-link btn_link active" : "nav-link btn_link bg-secondary text-white"} onClick={this.change_category.bind(null, category_.id)}>{category_.name}</button></li>)
            })
          }
          {this.state.user.admin_flg &&
          <li className="nav-item">
            <button className="nav-link" data-toggle="modal" data-target="#exampleModal">カテゴリー追加</button>
          </li>
          }
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
          <input type="hidden" name="post[user_id]" value={this.state.user.id} />
        </form>
        <button className="btn btn-primary" onClick={this.submit_btn}>投稿</button>
        <div className="card-columns">
        {this.state.posts.map(
          (post, idx) => {
            return(<div className="card">
                      <h4 className="card-header">{post.title}
                      </h4>
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted font-weight-light">{post.name}({post.mail})</h6>
                        <p className="card-text">{post.memo}</p>
                        {this.state.user.id == post.user_id &&
                        <p className="float-right">
                          <button className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示</button>
                        </p>
                        }
                      </div>
                    </div>)
          }
        )}
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">カテゴリー追加</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="category" >
                  <input className="form-control" type="text" name="category[name]" />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.category_create}>登録</button>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}


export default HelloWorld
