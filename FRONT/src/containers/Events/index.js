import { connect } from 'react-redux';
import Events from 'src/components/Events';
import { fetchEvents, sendAddEvent, setFieldValueEvent } from 'src/actions/events';
const mapStateToProps = (state) => (
  {
    events: state.events.events,
    newTitle: state.events.newTitle,
    newDescription: state.events.newDescription,
    newEventDate: state.events.newEventDate,
    isLogged: state.user.logged,
    addNewEvent: state.events.newEvent,
  });
const mapDispatchToProps = (dispatch) => {
  console.log('je suis dans la fonction mapdispatchToProps du container');
return({
  fetchEvents: () => dispatch(fetchEvents()),
  changeFieldEvent: (value, name) => dispatch(setFieldValueEvent(value, name)),
  handleAddEvent: () => dispatch(sendAddEvent()),
});
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
