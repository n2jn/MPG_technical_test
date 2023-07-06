import {LayoutChangeEvent} from 'react-native';

export interface AnimatedContainerChildrenProps {
  onLayout?: (e: LayoutChangeEvent) => void;
}

export interface AnimatedContainerRefType {
  showContent: (value: boolean) => void;
}
