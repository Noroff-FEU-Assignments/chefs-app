function SystemMessage(props) {
  const { content, type } = props;

  return <div className={type}>{content}</div>
}

export default SystemMessage;