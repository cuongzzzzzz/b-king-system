import { updateReceiverId } from "@/redux/chatSlice";
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BadgeDemo } from "./BagdeUi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";



export function TableDemo({ data }: { data: any }) {
    const dispatch = useDispatch()
    const handleClick = (id: string) => {
        dispatch(updateReceiverId(id))
    }
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-blue-600" >#</TableHead>
                    <TableHead className="text-blue-600">Tên chuyến</TableHead>
                    <TableHead className="text-blue-600">Điểm khởi hành</TableHead>
                    <TableHead className="text-blue-600">Điểm đến</TableHead>
                    <TableHead className="text-blue-600">Thời gian khởi hành</TableHead>
                    <TableHead className="text-blue-600">Thời gian đến dự tính</TableHead>
                    <TableHead className="text-blue-600">Đơn giá</TableHead>
                    <TableHead className="text-blue-600">Số lượng vé</TableHead>
                    <TableHead className="text-blue-600">Tổng</TableHead>
                    <TableHead className="text-blue-600">Tình trạng chuyến </TableHead>
                    <TableHead className="text-blue-600">action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data&&data.map((invoice: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{invoice.route.name}</TableCell>
                        <TableCell>{invoice.startStation.name}</TableCell>
                        <TableCell>{invoice.endStation.name}</TableCell>
                        <TableCell className="text-right">{invoice.trip.departureTime}</TableCell>
                        <TableCell className="font-medium">{invoice.trip.arrivalTime}</TableCell>
                        <TableCell>{invoice.trip.price}</TableCell>
                        <TableCell>{invoice.numberOfTickets}</TableCell>
                        <TableCell>{invoice.totalPrice}</TableCell>
                        <TableCell>{new Date(invoice.trip.departureDate) < new Date() ? <BadgeDemo>Đã chạy</BadgeDemo> : <BadgeDemo>Chưa chạy</BadgeDemo>}</TableCell>
                        <TableCell><Link to={"/conversation"} onClick={() => {
                            handleClick(invoice.provider._id)
                        }}><ChatIcon /></Link></TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
}
