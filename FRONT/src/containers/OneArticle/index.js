import { connect } from 'react-redux';
import OneArticle from 'src/components/OneArticle';
import {
  setFieldValueArticle, sendEditArticle, idArticleSelected, editDescription, editNewTitle,
} from 'src/actions/articles';
const mapStateToProps = (state) => {
//console.log('containers oneArticle newTagId',newTagId);
  return({
    newTitle: state.articles.newTitle,
    newDescription: state.articles.newDescription,
    pseudo: state.user.pseudo,
    editArticle: state.articles.editArticle,
    newTagId: state.articles.newTagId,
  });
}
const mapDispatchToProps = (dispatch) => ({
  idArticleSelected: (id) => dispatch(idArticleSelected(id)),
  changeFieldArticle: (value, name) => dispatch(setFieldValueArticle(value, name)),
  sendEditArticle: () => dispatch(sendEditArticle()),
  editNewTitle: (title) => dispatch(editNewTitle(title)),
  editDescription: (description) => dispatch(editDescription(description)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
