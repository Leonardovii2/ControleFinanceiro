import useExpenseModal from "./useExpenseModal";
import ExpenseModalView from "./ExpenseModal.view";

export default function ExpenseModal(props) {
  const modal = useExpenseModal(props);
  return <ExpenseModalView {...modal} />;
}
