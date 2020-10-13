import React from "react"
class HelloWorld extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      mail: "",
      title: "",
      memo: "",
      category_name: "",
      edit_category: {id: 0},
      users: props.users,
      categories: props.categories,
      posts: props.posts,
      category: props.category,
      user: props.user,
      edit_post: {id: 0},
      errors: null
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
  editCategoryChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.edit_category.name = value;
      return {edit_category: state.edit_category}
    });
  }
  createCategoryChange(event){
    const value = event.target.value;
    this.setState((state) => {
      state.category_name = value;
      return {category_name: state.category_name}
    });
  }

  // 投稿ボタン
  submit_btn = () => {
    const res = ajax_request("POST", $('#post').serialize(), "/welcomes");
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        posts: resJS.posts,
        name: resJS.name,
        mail: resJS.mail,
        title: resJS.title,
        memo: resJS.memo,
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

  // カテゴリ編集
  edit_category = (category_id) => {
    const res = ajax_request("GET", "", "/welcomes/" + category_id + "/edit")
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        edit_category: resJS.edit_category,
        errors: null
      })
    });
  }

  // カテゴリ更新
  update_category = (category_id) => {
    const res = ajax_request("PUT", "name=" + $("#category_name").val(), "/welcomes/" + category_id)
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        edit_category: {id: 0},
        categories: resJS.categories
      })
    });
  }

  // カテゴリ登録
  category_create = () => {
    const res = ajax_request("GET", "name=" + $("#category_create").val(), "/category_create")
    res.then((response) => {
      const resJS = JSON.parse(response);
      this.setState({
        categories: resJS.categories,
        errors: null,
        category_name: ""
      })
    });
  }

  // カテゴリ削除
  category_destroy = (category_id) => {
    if(confirm("削除しますか？")){
      const res = ajax_request("GET", "", "/category_destroy/" + category_id)
      res.then((response) => {
        const resJS = JSON.parse(response);
        this.setState({
          categories: resJS.categories,
          category: resJS.category,
          posts: resJS.posts,
          errors: null
        })
      });
    }
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
            ユーザー：
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
        <ul className="nav nav-tabs">
          <li className="nav-item"><button disabled className="nav-link">カテゴリ</button></li>
        {this.state.categories.map(
            (category_, idx) => {
              return(<li className="nav-item"><button className={category_.id == this.state.category.id ? "nav-link btn_link active" : "nav-link btn_link bg-secondary text-white"} onClick={this.change_category.bind(null, category_.id)}>{category_.name}</button></li>)
            })
          }
          {this.state.user.admin_flg &&
          <li className="nav-item">
            <button className="nav-link" data-toggle="modal" data-target="#exampleModal">管理機能</button>
          </li>
          }
        </ul>
        <div className="input-group">
          <form id="post" className="form-inline">
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
        </div>
        <div id="errorMsg" className={errorMsg == "" ?  "alert alert-danger navbar invisible" : "alert alert-danger navbar"}>
          {errorMsg}
        </div>
        <div className="card-columns">
        {this.state.posts.map(
          (post, idx) => {
            return(<div className="card">
                      <h4 className="card-header">{post.title}
                      </h4>
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted font-weight-light">名前：{post.name}(Mail:{post.mail})</h6>
                        <p className="card-text">{post.memo}</p>
                        {this.state.user.admin_flg == true ?
                          (this.state.user.id == post.user_id ?
                            (post.disp_flg == true ? <button className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示</button> : <button disabled className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示済</button>)
                            :
                            (post.disp_flg !== true && <button disabled className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示済</button>)
                          )
                          :
                          
                        this.state.user.id == post.user_id &&
                        <p className="float-right">
                          {post.disp_flg == true ?
                          <button className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示</button> : <button disabled className="btn btn-danger btn-sm" onClick={this.destroy_post.bind(null, post.id)}>非表示済</button>
                          }
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
                <h5 className="modal-title" id="exampleModalLabel">カテゴリ管理</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                
                  <ul className="list-group">
                  {this.state.categories.map(
                    (cat, idx) => {
                    return(<li className="list-group-item">
                      {this.state.edit_category.id == cat.id ? <input id="category_name" type="text" name="category_name" onChange={this.editCategoryChange.bind(this)} value={this.state.edit_category.name} /> : cat.name}(投稿数：{cat.count_posts}件)
                    <span className="float-right">
                    {this.state.edit_category.id == cat.id ? <button className="btn btn-success btn-sm" onClick={this.update_category.bind(null, this.state.edit_category.id)}>更新</button> : <button className="btn btn-primary btn-sm" onClick={this.edit_category.bind(null, cat.id)}>編集</button>}
                    <button className="btn btn-danger btn-sm" onClick={this.category_destroy.bind(null, cat.id)}>削除</button>
                    </span>
                    </li>)
                  })}
                  <li className="list-group-item"><input type="text" id="category_create" name="category_create" placeholder="新規追加" onChange={this.createCategoryChange.bind(this)} value={this.state.category_name} />
                    <span className="float-right">
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.category_create}>追加</button>
                    </span>
                  </li>
                  </ul>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">閉じる</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default HelloWorld
