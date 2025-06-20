interface Props {
  children: React.ReactNode;
}

const Titulo = ({ children }: Props) => {
  return <h2 className="text-center fw-bold my-4">{children}</h2>;
};

export default Titulo;
