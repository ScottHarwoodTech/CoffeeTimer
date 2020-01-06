import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Card, CardItem, Icon} from 'native-base';

const styles = StyleSheet.create({
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paneHeader: {},
});

const PaneTitle = ({title, onPress, open, openIcon, closeIcon}) => {
  const openI = openIcon ? openIcon : 'arrow-dropup';
  const closeI = closeIcon ? closeIcon : 'arrow-dropdown';
  return (
    <Card>
      <CardItem button onPress={onPress}>
        <Text style={{...styles.largeText}}>
          <Text>{title} </Text>
          <Icon name={open ? closeI : openI} />
        </Text>
      </CardItem>
    </Card>
  );
};

const Accordion = ({items}) => {
  const [openPanes, setOpenPanes] = useState([]);
  useEffect(() => {
    if (openPanes.length !== items.length) {
      //If new Pane Added
      const panes = [];
      items.forEach((item, index) => {
        panes.push(item.open ? true : false);
      });
      setOpenPanes([...panes]);
    }
  }, [items, openPanes]);

  const togglePane = i => {
    const panes = [...openPanes];
    panes[i] = !panes[i];
    setOpenPanes([...panes]);
  };
  return items.map((item, i) => (
    <React.Fragment key={item.key ? item.key : i}>
      <PaneTitle
        key={i}
        open={openPanes[i]}
        title={item.title}
        openIcon={item.openIcon}
        closeIcon={item.closeIcon}
        onPress={() => (item.onOpen ? item.onOpen(i) : togglePane(i))}
      />
      {openPanes[i] ? {...item.render, key: i} : null}
    </React.Fragment>
  ));
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default Accordion;
