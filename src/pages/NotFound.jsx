import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-medium text-pink">404</p>
      <h1 className="mt-4 text-2xl font-semibold">ไม่พบหน้าที่ค้นหา</h1>
      <p className="mt-2 text-muted">หน้านี้อาจถูกย้ายหรือยังไม่ถูกสร้างขึ้น</p>
      <Link to="/" className="btn-light mt-8">กลับหน้าแรก</Link>
    </div>
  );
}
