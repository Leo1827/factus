export default function Preloader({ fullScreen = false, text = "Cargando..." }) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${fullScreen ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50" : "py-10"}
      `}
    >
      {/* Spinner minimalista */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-gray-200" />
        <div className="w-10 h-10 rounded-full border-2 border-gray-900 border-t-transparent animate-spin absolute inset-0" />
      </div>

      {/* Texto */}
      {text && (
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}