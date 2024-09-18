import { FaCircleCheck } from "react-icons/fa6";
import "./VoteList.scss";
import img from "../../../../assets/download.jpg";

const VoteList = () => {
  return (
    <>
      <table className="text-center mt-4 tbl">
        <thead className="text-light ">
          <tr>
            <th></th>
            <th colSpan={2}>نام کاندید</th>
            <th>تعداد رای‌ها</th>
            <th>درصد رای</th>
            <th>رای شما</th>
          </tr>
        </thead>

        <tbody className="tbl_danger">
          <tr>
            <td>
              <div className="tbl_img">
                <img src={img} />
              </div>
            </td>
            <td colSpan={2}>ساراسادات کریمی</td>
            <td>50</td>
            <td>50</td>
            <td>
              <FaCircleCheck />
            </td>
          </tr>
        </tbody>

        <tbody className="tbl_blue">
          <tr>
            <td>
              <div className="tbl_img">
                <img src={img} />
              </div>
            </td>
            <td colSpan={2}>ساراسادات کریمی</td>
            <td>50</td>
            <td>50</td>
            <td>
              <FaCircleCheck />
            </td>
          </tr>
        </tbody>

        <tbody className="tbl_accept">
          <tr>
            <td>
              <div className="tbl_img">
                <img src={img} />
              </div>
            </td>
            <td colSpan={2}>ساراسادات کریمی</td>
            <td>50</td>
            <td>50</td>
            <td>
              <FaCircleCheck />
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td>
              <div className="tbl_img">
                <img src={img} />
              </div>
            </td>
            <td colSpan={2}>ساراسادات کریمی</td>
            <td>50</td>
            <td>50</td>
            <td>
              <FaCircleCheck />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default VoteList;
