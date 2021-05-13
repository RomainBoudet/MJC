import { connect } from 'react-redux';
import AddArticle from 'src/components/AddArticle';
import { sendAddArticle, setFieldValueArticle } from 'src/actions/articles';

const mapStateToProps = (state) => (
  {
    newTitle: state.articles.newTitle,
    newDescription: state.articles.newDescription,
    newArticle: state.articles.newArticle,
  });
const mapDispatchToProps = (dispatch) => ({
  changeFieldArticle: (value, name) => dispatch(setFieldValueArticle(value, name)),
  handleAddArticle: () => dispatch(sendAddArticle()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
