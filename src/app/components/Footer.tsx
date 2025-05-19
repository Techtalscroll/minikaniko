export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1321] text-white py-8 text-center space-y-2">
      {/* Icon or Logo */}
      <div className="text-4xl">#</div>
      <h2 className="text-xl font-semibold">ConQuiz</h2>

      {/* Group Members */}
      <div>
        <p className="font-semibold">Group Project by</p>
        <p>Kurt Ivan Quejada</p>
        <p>Princess Joy Lumbre</p>
        <p>Lady Henesy Rescober</p>
      </div>

      {/* Copyright */}
      <p className="text-sm pt-2">
        Copyright &copy; {new Date().getFullYear()} – All rights reserved
      </p>
    </footer>
  );
}
