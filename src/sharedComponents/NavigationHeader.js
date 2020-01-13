import React from 'react';
import {Body, Title, Header, Left, Right, Button, Icon} from 'native-base';

const NavigationHeader = props => (
  <Header>
    <Left>
      <Button transparent onPress={() => props.navigation.toggleDrawer()}>
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{props.title}</Title>
    </Body>
    <Right />
  </Header>
);

export default NavigationHeader;
