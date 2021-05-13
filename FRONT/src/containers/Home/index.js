import { connect } from 'react-redux';
import Home from 'src/components/Home';
import { fetchArticles } from 'src/actions/articles';
import { setMessage } from 'src/actions/user';

const mapStateToProps = (state) => (
  {
    articles: state.articles.articles,
    games: state.games.games,
    events: state.events.events,
    addNewArticle: state.articles.addNewArticle,
    isLogged: state.user.logged,
    message: state.user.message,
  });
const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles()),
  setMessage:(message)=> dispatch(setMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
