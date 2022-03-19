import React from 'react';

export interface AbstractDialogConfig {
  component: React.ComponentType<any>;
  onClose?: () => void;
  props: { [key: string]: any };
  title: string;
}

export interface DialogConfig<
  TProps extends {},
  TComponent extends React.ComponentType<TProps>
> extends AbstractDialogConfig {
  component: TComponent;
  props: TProps;
}

export type DialogConfigFn = <
  TProps extends {},
  TComponent extends React.ComponentType<TProps>
>(
  config: DialogConfig<TProps, TComponent>,
) => void;

interface Context {
  isDialogOpen: boolean;
  renderDialog: DialogConfigFn;
}

const DialogContext = React.createContext<Context | null>(null);

export default DialogContext;
