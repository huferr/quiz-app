import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

export function SafeView({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>;
}

const Container = styled.SafeAreaView`
  padding-top: ${Platform.OS === 'android' ? 40 : 0}px;
  flex: 1;
`;
