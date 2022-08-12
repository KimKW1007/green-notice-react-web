  class MainComponent extends React.Component {
    render() {
      const {title} = this.props;
      return (
        <> 
        <div id='noticeWrap'>
          <div className='container'>
            <div className='title'>
              <h2>{title}</h2>
            </div>
            <div className='content'>
              <NoticeComponent/>
            </div>
          </div>
        </div>          
        </>
      );
    };
  };

  
  class NoticeComponent extends React.Component {
    $newDate = new Date();
    Today = this.$newDate.getFullYear() +'-'+ String(this.$newDate.getMonth()+1).padStart(2,"0") +'-'+ String(this.$newDate.getDate()).padStart(2,"0")
      constructor(props) {
        super(props);
        this.state = {
          subjectTxt : '',
          contentsTxt : '',
          dateTxt : this.Today,
          nextNo : localStorage.length + 1,
          isHave : ''
        }
    }
    subjectFn = (e) =>{
      this.setState({subjectTxt : e.target.value})
    }
    contentsFn = (e) =>{
      this.setState({contentsTxt : e.target.value})
    }
    dateFn = (e) =>{
      this.setState({dateTxt : e.target.value.replace(/[^-0-9]/g,'')})
    }

    submitFn = (e) =>{
      const {nextNo,subjectTxt,contentsTxt,dateTxt} = this.state;
      if(subjectTxt == '' || contentsTxt == '' || dateTxt == ''){
        alert('모든 입력란을 작성해주세요!')
        return e.preventDefault();
      }
      e.preventDefault();
      let obj = 
          {
            No : nextNo,
            subject : subjectTxt,
            contents : contentsTxt,
            date : dateTxt
          }

      localStorage.setItem(nextNo,JSON.stringify(obj))
      this.setState({nextNo : nextNo + 1})
      this.setState({subjectTxt : ''})
      this.setState({contentsTxt : ''})
      this.setState({dateTxt : this.Today})
      this.setState({isHave : ' true'})
    
    }
    render() {
      const {subjectTxt,contentsTxt,dateTxt,isHave} = this.state
      return (
        <>
          <div id='notice-form'>
            <div className='notice-inner'>
              <form name='noticeForm' id='noticeForm' action='./response.php' method='get'>
                <ul>
                  <li>
                    <input type='text' id='subject' value={subjectTxt} onChange={this.subjectFn} placeholder='제목을 입력해주세요'/>
                  </li>
                  <li>
                    <textarea id='contents' value={contentsTxt} onChange={this.contentsFn} placeholder='내용을 입력해주세요'></textarea>
                  </li>
                  <li>
                    <input type='text' id='date' maxLength = '10'  value={dateTxt} onChange={this.dateFn} placeholder='ex) 0000-00-00'/>
                  </li>
                </ul>
                <div className='button-wrap'>
                  <button type='submit' onClick={this.submitFn}><span>Write</span><i className='xi-pen'></i></button>
                </div>
              </form>
            </div>
            <NoticeListCpt isHave={isHave}/>
          </div>          
        </>
      );
    }
  }
  
  
  class NoticeListCpt extends React.Component {
    render() {
      const {isHave} = this.props;
      let notice = [];
      for (let i =  0; i < localStorage.length; i++) {
          notice[i] = JSON.parse(localStorage.getItem(i + 1))  
      }
      notice.sort().reverse();
      const listItems = notice.map((item,idx)=>{
        return(
          <tr key={idx}>
            <td className='col01'>{item.No}</td>
            <td className='col02'><a href='#' title={item.subject}>{item.subject}</a></td>
            <td className='col03'>{item.date}</td>
          </tr>
        )
      })
      return (
        <>
          <div className='list-wrap'>
            <div className='list-inner'>
              <div className='list-title'>
                <h2>Notice List</h2>
                <a href='#'><i className='xi-angle-down'></i></a>
              </div>
              <div className={'table-wrap' + isHave}>
                <table>
                  <thead>
                    <tr>
                      <th className='col01'>NO</th>
                      <th className='col02'>제목</th>
                      <th className='col03'>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems}
                  </tbody>
                </table>
              </div>
            </div>
          </div>          
        </>
      );
    }
  }
  



  MainComponent.defaultProps = {
    title : 'Notice Board'
  }


  ReactDOM.render(
    <MainComponent/>,
    document.querySelector('#app')
  );

  (function($,window){
    var listInner = $('.list-inner'),
        downBtn  = listInner.find('.list-title a i'),
        tableWrap  = listInner.find('.table-wrap');


        downBtn.click(function(e){
          e.preventDefault();
          $(this).toggleClass('xi-angle-down')
          $(this).toggleClass('xi-angle-up')
          listInner.toggleClass('addCss')
        })

        if(localStorage.length > 0){
          tableWrap.addClass('true')
        }

  })(jQuery,window)